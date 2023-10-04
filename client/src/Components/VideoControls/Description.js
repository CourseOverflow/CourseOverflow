import React, { useState } from "react";
import styles from "./Description.module.css";
import Modal from "./Modal";

const Description = () => {
  const descriptionText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a quamdiam. Ut pellentesque nulla turpis, a luctus dolor varius facilisis. Inest augue, maximus eu malesuada vitae, varius vitae lectus. Donec eratdiam, placerat id leo vel, egestas rhoncus erat. Phasellus feugiat, antequis laoreet cursus, felis ipsum tincidunt elit, at congue tortor justoeget ante. Maecenas tincidunt rutrum sem, sed facilisis libero tempornon. Maecenas maximus sapien ut nibh facilisis gravida. Integer maximustortor mauris, ut ultricies leo faucibus et. Vivamus nisl eros, feugiatut enim a, porttitor vulputate dolor. Fusce hendrerit turpis ultricieselit mattis fringilla. Integer erat nibh, dapibus at imperdiet ut,lobortis ut dui.";

  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className={styles.description}>
      <h1>Description</h1>
      <p>
        {descriptionText.length < 250
          ? descriptionText
          : `${descriptionText.slice(0, 250)}...`}
      </p>
      <button onClick={() => setShowFullDescription(true)}>Read More</button>

      {showFullDescription && (
        <Modal
          onClose={() => setShowFullDescription(false)}
          descriptionText={descriptionText}
        />
      )}
    </div>
  );
};

export default Description;
