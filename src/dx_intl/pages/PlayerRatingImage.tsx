import { Layer, Stage, Text } from "react-konva"

const RatingImage = () => {
  return (
    <Stage width={1000} height={1000}>
      <Layer>
        <Text
          text="空回りライブラリ"
          fontSize={30}
          fontFamily="M PLUS Rounded 1c"
          fontWeight={800}
        />
      </Layer>
    </Stage>
  )
}

export default RatingImage
