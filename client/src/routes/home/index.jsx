import Box from "@mui/material/Box";
import Lottie from "lottie-react";
import Typography from "@mui/material/Typography";
import arrowUpLottie from "../../lotties/arrow-up.json";

const HomeRoute = () => {
  return (
    <Box>
      <Box sx={{ width: "260px", height: "300px", margin: "0 auto" }}>
        <Lottie animationData={arrowUpLottie} />
        <Typography variant="h4" component="h2" align="center">
          Select a page to get started
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeRoute;
