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
import { useForm } from "@mantine/form";
import { useState } from "react";
import supabase from "@supabase/supabase-js";

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
  const [notification, setNotification] = useState(false);
  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      notes: "",
      termsOfService: false,
    },
    validate: {
      title: (value) => {
        if (!value.trim()) {
          return "Note title is required";
        }
      },
      category: (value) => {
        if (!value.trim()) {
          return "Note category is required";
        }
      },
      notes: (value) => {
        if (!value.trim()) {
          return "Note is required";
        }
      },
    },
  });

  const handleSave = async () => {
    const { data, error } = await supabase.from("notes").insert([
      {
        title: form.values.title,
        category: form.values.category,
        notes: form.values.notes,
      },
    ]);
    if (error) {
      console.log("error", error);

      setNotification(true);
    }
    if (data) {
      console.log("data", data);
      setNotification(false);
    }

    router.push("/list/myNotes");

    console.log("form.values", form.values);

    console.log("form.values.title", form.values.title);
    console.log("form.values.category", form.values.category);
    console.log("form.values.notes", form.values.notes);
  };

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
      <Paper shadow="md" p="3rem">
        {notification && (
          <Text color="red" size="sm">
            Please fill in all required fields
          </Text>
        )}
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <TextInput
            label="Note Title"
            placeholder="Enter your note title here"
            withAsterisk
            {...form.getInputProps("title")}
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
            {...form.getInputProps("category")}
            withAsterisk
          />
        </SimpleGrid>

        <Textarea
          mt="md"
          label="Your Notes"
          placeholder="Please include all relevant Note information here."
          minRows={10}
          withAsterisk
          {...form.getInputProps("notes")}
        />
      </Paper>
      <Group position="center" p="lg" mt="2rem">
        <Group position="center">
          <Button
            onClick={() => router.push("/list/myNotes")}
            bg="gray"
            size="md"
            mx="2rem"
          >
            Cancel
          </Button>
        </Group>
        <Group>
          <Button onClick={() => handleSave()} size="md">
            Save
          </Button>
        </Group>
      </Group>
    </Container>
  );
}

export default myNotes;
