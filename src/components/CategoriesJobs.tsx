import { CATEGORIES, type Category } from "../utils/categories";

interface CategoryTabsProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="tz-tabs-wrap">
      <div className="tz-tabs" role="tablist" aria-label="Categorías">
        {CATEGORIES.map((c) => {
          const isActive = selectedCategory === c;

          return (
            <button
              key={c}
              role="tab"
              aria-selected={isActive}
              className={`tz-tab ${isActive ? "active" : ""}`}
              onClick={() => onSelectCategory(c as Category)}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;