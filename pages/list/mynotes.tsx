import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  rem,
  Group,
} from "@mantine/core";
import { useRouter } from "next/router";
import { IconNotes } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    paddingTop: rem(30),
    paddingBottom: rem(30),

    [theme.fn.smallerThan("sm")]: {
      paddingTop: rem(80),
      paddingBottom: rem(60),
    },
  },
}));

function myNotes() {
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <Container size={1000} className={classes.wrapper}>
      {" "}
      {/* This is the container that holds the Page title and button */}
      <Group position="center" p="lg" bg="green">
        <Group>
          <Title>My Notes</Title>
        </Group>
        <Group ml="auto">
          <Button onClick={() => router.push("/list/newNote")}>
            Create a new note
          </Button>
        </Group>
      </Group>
      {/* This is the container that holds the note title and button */}
      <Group position="left" p="lg" bg="green" my="lg">
        <Group>
          <IconNotes size={30} color="white" />
          Note Title
        </Group>
        <Group ml="auto">
          <Button onClick={() => router.push("/list/newNote")}>Edit</Button>
        </Group>
      </Group>
    </Container>
  );
}

export default myNotes;
