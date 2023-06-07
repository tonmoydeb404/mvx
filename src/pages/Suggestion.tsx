import { useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useMovieGenreQuery, useTvGenreQuery } from "../api/genreApi";
import SuggestionCard from "../common/components/cards/SuggestionCard";
import Loading from "../common/components/utils/Loading";
import openai from "../config/openai";
import { Genre } from "../types/genre.type";
import { Suggestion as SuggestionType } from "../types/suggestion.type";

type EntType = "all" | "movie" | "tv";
const entOptions: { title: string; value: EntType }[] = [
  { title: "Anything", value: "all" },
  { title: "Movies", value: "movie" },
  { title: "Tv Shows", value: "tv" },
];

const Suggestion = () => {
  const movieGenre = useMovieGenreQuery(undefined);
  const tvGenre = useTvGenreQuery(undefined);

  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [entType, setEntType] = useState<EntType>("all");

  const [data, setData] = useState<SuggestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [extra, setExtra] = useState("");

  useEffect(() => {
    let combinedGenres: Genre[] = [];

    // include tv genres
    if (tvGenre.isSuccess && (entType === "all" || entType === "tv")) {
      combinedGenres.push(...tvGenre.data.genres);
    }

    // include movie genres
    if (movieGenre.isSuccess && (entType === "all" || entType === "movie")) {
      combinedGenres.push(...movieGenre.data.genres);
    }

    // remove duplicate genres
    if (entType === "all") {
      combinedGenres = combinedGenres.filter((genre, index, array) => {
        const findedIndex = array.findIndex((item) => item.id === genre.id);

        return index === findedIndex;
      });
    }

    // filter already selected genres
    setSelectedGenres((prev) =>
      prev.filter(
        (id) => combinedGenres.findIndex((item) => item.id === id) !== -1
      )
    );
    setGenres(combinedGenres);
  }, [
    movieGenre.isSuccess,
    tvGenre.isSuccess,
    movieGenre.data,
    tvGenre.data,
    entType,
  ]);

  useEffect(() => {
    setLoading(movieGenre.isLoading || tvGenre.isLoading);
  }, [movieGenre.isLoading, tvGenre.isLoading]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) return prev.filter((i) => i !== genreId);
      return [...prev, genreId];
    });
  };

  const generate = async () => {
    try {
      setLoading(true);
      const allGenres = genres
        .filter((genre) => selectedGenres.includes(genre.id))
        .map((genre) => genre.name)
        .join(",");
      const prompt = `Give me a list of 4 ${
        entType && entType !== "all" ? entType : ""
      } recommendations from TMDB api ${
        allGenres
          ? `that fit all of the following categories: ${allGenres}`
          : ""
      }. ${
        extra
          ? `Make sure it fits the following description as well: ${extra}.`
          : ""
      } ${
        allGenres
          ? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${
              entType && entType !== "all" ? `${entType}'s` : ""
            } that I might like.`
          : ""
      } Your response should be in JSON format. Create a list object with the parameter 'title', 'id', 'media_type'`;

      const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const content = result.data.choices[0].message?.content;

      if (!content) throw new Error("error");

      const array = JSON.parse(
        content.slice(content.indexOf("["), content.indexOf("]") + 1)
      );
      setData(array as SuggestionType[]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header
        style={{ backgroundImage: "url('/images/background.png')" }}
        className="bg-overlay mb-24"
      >
        <div className="container flex items-center justify-center min-h-[400px] ">
          <div className="z-[1] relative flex flex-col">
            <h2 className="text-5xl sm:text-6xl font-bold text-center">
              <span className="text-primary-600">AI</span> Suggestion.
            </h2>
            <p className="sm:text-lg mt-2 text-center">
              get suggestions based on your preference
            </p>
            {!loading && data.length ? (
              <button
                className="btn btn-primary self-center mt-5"
                onClick={() => setData([])}
              >
                Regenerate <HiRefresh />
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {loading ? (
        <Loading className="mb-24" />
      ) : (
        <>
          {data.length ? (
            <div className="container mb-24 grid grid-cols-2 gap-2">
              {data.map((d) => (
                <SuggestionCard key={d.id} {...d} />
              ))}
            </div>
          ) : (
            <div className="container  mb-24">
              <div className="mb-10">
                <h3 className="font-medium text-xl mb-4">
                  What kind of entertainment you are looking for?
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {entOptions.map((ent) => (
                    <button
                      key={ent.value}
                      className={`pill pill-primary ${
                        entType === ent.value ? "active" : ""
                      }`}
                      onClick={() => setEntType(ent.value)}
                    >
                      {ent.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-medium text-xl mb-4">
                  Select Genres that you are looking for?
                </h3>
                <div className="flex gap-2 flex-wrap ">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      className={`pill pill-primary ${
                        selectedGenres.includes(genre.id) ? "active" : ""
                      }`}
                      onClick={() => toggleGenre(genre.id)}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-16">
                <h3 className="font-medium text-xl mb-4">
                  Have you any custom queries?
                </h3>
                <textarea
                  name="query"
                  className="form-textarea w-full rounded-lg bg-secondary-800 min-h-[150px] focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Ex: Must have 5 star rating"
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                ></textarea>
              </div>

              <button className="btn btn-primary" onClick={generate}>
                Generate
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Suggestion;
