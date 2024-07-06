import { useTheme } from "@emotion/react"
import { Rectangles } from "@ryohey/webgl-react"
import Color from "color"
import { range } from "lodash"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { Rect } from "../../../entities/geometry/Rect"
import { colorToVec4 } from "../../../gl/color"
import { useStores } from "../../../hooks/useStores"

export const Lines: FC<{ width: number; zIndex: number }> = observer(
  ({ width, zIndex }) => {
    const {
      tempoEditorStore: { transform },
    } = useStores()
    const theme = useTheme()

    const hline = (y: number): Rect => ({
      x: 0,
      y,
      width,
      height: 1,
    })

    // 30 -> 510 = 17 Divided line
    const rects = range(30, transform.maxBPM, 30)
      .map((i) => transform.getY(i))
      .map(hline)
    const color = colorToVec4(Color(theme.dividerColor))

    return <Rectangles rects={rects} color={color} zIndex={zIndex} />
  },
)
