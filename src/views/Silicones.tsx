export default function Silicones() {
  return (
    <section>
      <h2>Silicone-based vs. water-based</h2>
      <p>
        Many foundations and primers fall into one of two camps. Neither is "good" or "bad": it
        depends on your skin and what you want from the product.
      </p>

      <div className="grid">
        <div className="card">
          <h3>Silicone-based</h3>
          <ul>
            <li>Silicone (e.g. dimethicone) is high on the ingredient list, often first or second after water.</li>
            <li>Feels slippery and smooth, and blurs the look of pores and fine lines.</li>
            <li>Tends to last well and resist sweat.</li>
            <li>Pairs best with other silicone products.</li>
            <li>Can feel heavy to some people and needs a proper cleanse at night.</li>
          </ul>
        </div>
        <div className="card">
          <h3>Water-based</h3>
          <ul>
            <li>Water (aqua) is first, with little or no silicone.</li>
            <li>Feels lighter and more like skincare.</li>
            <li>Often more hydrating and breathable-feeling.</li>
            <li>Pairs best with other water-based products.</li>
            <li>Can wear off faster and look less "blurred".</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>How to spot silicones on a label</h3>
        <p>Look for ingredient names ending in:</p>
        <p className="chips">
          <span>-cone</span> <span>-siloxane</span> <span>-silanol</span> <span>-conol</span>
        </p>
        <p>
          Examples: dimethicone, cyclopentasiloxane, dimethiconol, trimethylsiloxysilicate.
        </p>
      </div>

      <div className="card">
        <h3>The layering rule of thumb</h3>
        <p>
          Silicone and water don't mix well. A silicone primer under a water-based foundation can
          make the foundation bead up or slide around. Many people match the type: silicone primer
          with silicone foundation, water-based with water-based. It's a guideline, not a law, so
          test combinations that you like.
        </p>
      </div>

      <div className="card">
        <h3>Myths worth knowing</h3>
        <ul>
          <li>"Silicones suffocate skin": they are not known to do that, but they can feel heavy.</li>
          <li>"Silicones always cause breakouts": not by themselves. Thorough cleansing matters more.</li>
          <li>"Silicone-free is always better": it's a preference. Check how <em>your</em> skin responds.</li>
        </ul>
      </div>
    </section>
  );
}
