import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  const [searchIn, setSearchIn] = useState("");
  const [language, setLanguage] = useState("");
  const [newsData, setNewsData] = useState([]);

  // fetch lokale API
  const newsSearch = () => {
    fetch(`/datas/${language}.json`)
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((err) => console.error(err));
  };

  // fetch online API, Aber nicht so gut klappt
  // const newsSearch = () => {
  //   fetch(
  //     `https://newsapi.org/v2/everything?q=apple&from=2023-11-30&to=2023-11-30&language=${language}&sortBy=popularity&apiKey=adbdce8e05ca48d0a6aa6ed6e8e76702`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setNewsData(data.articles);
  //     });
  // };

  // Hier filtert die News

  const newsFilter = newsData.filter((news) =>
    news.title?.toLowerCase().includes(searchIn?.toLowerCase())
  );

  //   Hier kommt die HTML
  return (
    <section className="homePage">
      <article className="searchArea">
        <h1>Breaking News</h1>
        <div>
          <input
            id="textInput"
            type="text"
            placeholder="Type to search..."
            className="textInput"
            onChange={(event) => setSearchIn(event.target.value)}
          />
          <select
            name="language"
            id="language"
            onChange={(event) => setLanguage(event.target.value)}
          >
            <option value="language">Select your language</option>
            <option value="ar">Arabian</option>
            <option value="de">German</option>
            <option value="en">English</option>
            <option value="es">Spanisch</option>
            <option value="fr">French</option>
            {/* <option value="he">Hebrew</option> */}
            <option value="it">Italian</option>
            <option value="nl">Dutch</option>
            {/* <option value="no">Norwegian</option> */}
            <option value="pt">Portugese</option>
            <option value="ru">Russian</option>
            <option value="sv">Swedish</option>
            {/* <option value="ud">Udmurdt</option> */}
            <option value="zh">Chinese</option>
          </select>

          <Button name={"Search"} onClick={newsSearch} />
        </div>
      </article>
      <article className="newsGallery">
        {newsFilter ? (
          <div>
            {newsFilter.map((news, index) => (
              <div key={index} className="singleNews">
                <h2>{news.title} </h2>
                <img src={news.urlToImage} alt={news.title} />
                <p>{news.description} </p>
                <Link to={`/dynamic-router/${index}/${language}/${searchIn}`}>
                  <h3>Read more</h3>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>News Laden...</p>
        )}
      </article>
    </section>
  );
};

export default Home;
