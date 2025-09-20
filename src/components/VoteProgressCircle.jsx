import { Box, CircularProgress } from "@mui/material";
function VoteProgressCircle({ value }) {
  const numericValue = Number(value) || 0;
  const percentage = (numericValue / 10) * 100;
  const color = numericValue >= 7 ? "success" : "warning";
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={percentage} color={color} thickness={6}   // الافتراضي 3.6، كل ما تزود الرقم الدايرة هتتخن
        size={40} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"

      >
        <span className="text-sm font-bold text-white ">
          {numericValue.toFixed(1)}
        </span>
      </Box>
    </Box>
  );
}
export default VoteProgressCircle;