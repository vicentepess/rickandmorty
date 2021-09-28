import "./style.css";
import ChardCard from "../ChardCard/ChardCard";
import { useMemo, useCallback, useRef } from "react";

const Characters = ({ CharacterList, loadMoreData, loading }) => {

  const observer = useRef();

  const options = useMemo(() => {
    return {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
  }, []);

  const targetRef = useCallback(
    (lastElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          loadMoreData();
        }
      }, options);
      if (lastElement) observer.current.observe(lastElement);
    },
    [loading, options, loadMoreData]
  );

  return (
    <div className="container">
      {CharacterList.map((elem, idx) => {
        if (idx === CharacterList.length - 1) {
          return (
            <div className="cardsCont" key={elem?.id} ref={targetRef}>
              <ChardCard elem={elem} />
            </div>
          );
        } else {
          return (
            <div className="cardsCont" key={elem?.id}>
              {" "}
              <ChardCard elem={elem} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default Characters;
