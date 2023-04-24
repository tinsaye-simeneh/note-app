import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  rem,
  Group,
  TextInput,
  Textarea,
  Select,
  SimpleGrid,
  Paper,
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
          <Title>New Notes</Title>
        </Group>
        <Group ml="auto">
          <Button onClick={() => router.push("/list/myNotes")}>
            Back to My Notes
          </Button>
        </Group>
      </Group>
      {/* This is the container that holds the note title and button */}
      <Paper shadow="sm" p="3rem">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <TextInput
            label="Note Title"
            placeholder="Enter your note title here"
          />
          <Select
            label="Note Category"
            placeholder="Pick one"
            data={[
              { value: "Quick Note", label: "Quick Note" },
              { value: "Work", label: "Work" },
              { value: "Study", label: "Study" },
              { value: "Finance", label: "Finance" },
            ]}
          />
        </SimpleGrid>

        <Textarea
          mt="md"
          label="Your Notes"
          placeholder="Please include all relevant Note information here."
          minRows={10}
        />
      </Paper>
      <Group position="center" p="lg" bg="green">
        <Group position="center">
          <Button onClick={() => router.push("/list/myNotes")} bg="gray">
            Cancel
          </Button>
        </Group>
        <Group>
          <Button onClick={() => router.push("/list/myNotes")}>Save</Button>
        </Group>
      </Group>
    </Container>
  );
}

export default myNotes;
