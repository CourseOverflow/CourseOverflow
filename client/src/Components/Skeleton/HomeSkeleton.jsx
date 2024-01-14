import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styles from "./Skeletons.module.css";

const HomeSkeleton = () => {
  return (
    <div className={styles.home}>
      {Array.from(new Array(3)).map((_, outerIndex) => (
        <Grid
          key={outerIndex}
          container
          wrap="nowrap"
          sx={{ alignItems: "center", gridTemplateRows: "repeat(3, 1fr)" }}
        >
          <div className={styles.home__title}>
            <Skeleton
              variant="text"
              sx={{
                backgroundColor: "var(--skeleton)",
                fontSize: "2rem",
                width: 700,
              }}
            />
            <div className={styles.home__cards}>
              {Array.from(new Array(4)).map((_, innerIndex) => (
                <Grid
                  item
                  key={innerIndex}
                  sx={{
                    justifyItems: "center",
                    width: 320,
                    marginRight: 2,
                    my: 5,
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    width={320}
                    height={160}
                    sx={{ backgroundColor: "var(--skeleton)" }}
                  />
                  <Box sx={{ pt: 0.5 }}>
                    <Skeleton sx={{ backgroundColor: "var(--skeleton)" }} />
                    <Skeleton
                      sx={{ backgroundColor: "var(--skeleton)", width: "60%" }}
                    />
                  </Box>
                </Grid>
              ))}
            </div>
          </div>
        </Grid>
      ))}
    </div>
  );
};

export default HomeSkeleton;
