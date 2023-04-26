import { useToggle, upperFirst } from "@mantine/hooks";
import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
  Flex,
} from "@mantine/core";
import { GoogleIcon } from "./GoogleIcon";
import { FacebookIcon } from "./FacebookIcon";
import supabase from "../../utilities/supabaseClient";
import { useRouter } from "next/router";

function Account(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async () => {
    if (type === "register") {
      const { data, error } = await supabase.auth.signUp({
        email: form.values.email,
        password: form.values.password,
      });

      if (error) {
        alert(error.message);
      } else {
        setLoading(true);
        alert("Check your email for the confirmation link");
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.values.email,
        password: form.values.password,
      });

      if (error) {
        alert(error.message);
      } else {
        alert("Logged in successfully");
        console.log(data);
        router.push("/");
      }
    }
  };

  return (
    <Container
      size="xs"
      bg={type === "register" ? "#103037" : "#103037"}
      px={type === "register" ? "xl" : "md"}
      py="xl"
      mt={type === "register" ? "4rem" : "7rem"}
    >
      <Paper radius="md" px="xl" py="xl" withBorder {...props}>
        <Text size="lg" weight={500} mx="auto" align="center" my="md">
          Welcome to Note App
        </Text>

        <Stack>
          <Flex mx="auto" mt="md">
            <Button
              mr={type === "register" ? "xl" : "md"}
              leftIcon={<GoogleIcon />}
              variant="default"
              color="gray"
            >
              Continue with Google
            </Button>
            <Button
              leftIcon={<FacebookIcon />}
              sx={(theme) => ({
                backgroundColor: "#4267B2",
                color: "#fff",
                "&:hover": {
                  backgroundColor: theme.fn.darken("#4267B2", 0.1),
                },
              })}
            >
              Continue with Facebook{" "}
            </Button>
          </Flex>
        </Stack>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <Stack>
            {type === "register" && (
              <>
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
                <TextInput
                  label="Name"
                  placeholder="Your Phone"
                  value={form.values.phone}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
              </>
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" bg="#103037">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}

export default Account;
