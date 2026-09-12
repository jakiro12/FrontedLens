import { CATEGORIES } from "../utils/categories";

const CategoryTabs=() => {
    
  return (
    <div className="tz-tabs-wrap">
      <div className="tz-tabs" role="tablist" aria-label="Categorías">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            role="tab"
            className="tz-tab"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
export default CategoryTabs