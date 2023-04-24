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
    <Container size={1400} className={classes.wrapper}>
      {" "}
      {/* This is the container that holds the title and button */}
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
      <Group position="center" p="lg" bg="green" my="lg"></Group>
    </Container>
  );
}

export default myNotes;
