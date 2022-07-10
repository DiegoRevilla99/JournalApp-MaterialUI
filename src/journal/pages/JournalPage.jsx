import { AddOutlined } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../views/NoteView";
import { NothingSelectedView } from "../views/NothingSelectedView";

export const JournalPage = () => {
	return (
		<JournalLayout>
			{/* <Typography>
				Ad amet ut qui incididunt fugiat pariatur occaecat consectetur officia.
				Reprehenderit do aliquip ipsum in minim consectetur reprehenderit non fugiat non.
				Officia irure dolore magna est elit adipisicing nisi officia exercitation sit
				adipisicing mollit proident ex. Id mollit quis qui sit pariatur ex.
			</Typography> */}

			<NothingSelectedView />
			{/* <NoteView /> */}

			<IconButton
				size="large"
				sx={{
					color: "white",
					backgroundColor: "error.main",
					":hover": { backgroundColor: "error.main", opacity: 0.9 },
					position: "fixed",
					right: 50,
					bottom: 50,
				}}
			>
				<AddOutlined sx={{ fontSize: 30 }} />
			</IconButton>
		</JournalLayout>
	);
};
