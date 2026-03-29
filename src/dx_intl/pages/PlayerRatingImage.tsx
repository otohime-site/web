import { useEffect, useState } from "react"
import { Layer, Stage, Text } from "react-konva"

const RatingImage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    document.fonts
      .load('800 30px "M PLUS Rounded 1c"', "空回りライブラリ")
      .then(() => {
        setFontsLoaded(true)
      })
  }, [])

  if (!fontsLoaded) {
    return null
  }

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
