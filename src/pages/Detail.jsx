import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Detail = () => {
  const params = useParams();
  const [newsData, setNewsData] = useState([]);

  const newsIndex = params.index || 0;
  const language = params.language || "en";
  const searchIn = params.search || "";

  useEffect(() => {
    fetch(
      `http://newsapi.org/v2/everything?q=apple&from=2023-11-30&to=2023-11-30&sortBy=popularity&language=${language}&apiKey=adbdce8e05ca48d0a6aa6ed6e8e76702`
    )
      .then((response) => response.json())
      .then((data) => setNewsData(data.articles))
      .catch((err) => console.error(err));
  }, []);

  const newsFilter = newsData.filter((news) =>
    news.title.toLowerCase().includes(searchIn.toLowerCase())
  );

  const newsDetail = newsFilter.filter(
    (news, index) => index.toString() === newsIndex.toString()
  );
  console.log(newsDetail);
  return (
    <section className="detailPage">
      {newsDetail.length ? (
        <div className="details">
          <Link to="/">
            <Button name={"Go back"} />
          </Link>
          <img src={newsDetail[0].urlToImage} alt={newsDetail[0].title} />
          <h4>{newsDetail[0].title} </h4>
          <div>
            <h5>{newsDetail[0].description}</h5>
            <p>{newsDetail[0].content}</p>
          </div>
          <p>{newsDetail[0].author}</p>
        </div>
      ) : (
        <p>Details Loading...</p>
      )}
    </section>
  );
};

export default Detail;
