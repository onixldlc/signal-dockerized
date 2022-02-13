import styled from "@emotion/styled"
import { Add } from "@mui/icons-material"
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { observer } from "mobx-react-lite"
import React, { FC, useCallback } from "react"
import { localized } from "../../../common/localize/localizedString"
import { addTrack } from "../../actions"
import { useStores } from "../../hooks/useStores"
import { TrackListItem } from "./TrackListItem"

const AddTrackListIcon = styled(ListItemIcon)`
  min-width: auto;
  margin-right: 0.6em;
`

const StyledList = styled(List)`
  overflowy: "auto";
  border-right: 1px solid ${({ theme }) => theme.dividerColor};
`

export const TrackList: FC = observer(() => {
  const rootStore = useStores()

  const onClickAddTrack = useCallback(() => addTrack(rootStore)(), [])

  return (
    <StyledList disablePadding>
      {rootStore.song.tracks.map(
        (t, i) => !t.isConductorTrack && <TrackListItem key={i} trackId={i} />
      )}
      <ListItem button onClick={onClickAddTrack}>
        <AddTrackListIcon>
          <Add />
        </AddTrackListIcon>
        <ListItemText primary={localized("add-track", "Add track")} />
      </ListItem>
    </StyledList>
  )
})
