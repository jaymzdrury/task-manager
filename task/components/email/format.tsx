import React from "react";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Html,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Task } from "@/types/types";
import { env } from "@/types/env";
import { cn } from "@/lib/utils";

export default function Email({ task }: { task: Task }): JSX.Element {
  return (
    <Html>
      <Head />
      <Tailwind>
        <React.Fragment>
          <Body className="bg-white my-12 mx-auto font-sans">
            <Container>
              <Section>
                <Text className="text-xl font-bold pt-2 px-4 text-lime-600">
                  ✅ Task Pro
                </Text>
              </Section>
              <Section>
                <Row>
                  <Column align="center">
                    <Text
                      className={cn(
                        task.users[0].role === "user"
                          ? "bg-blue-600"
                          : task.users[0].role === "admin"
                          ? "bg-amber-600"
                          : "bg-red-700",
                        "text-white text-3xl text-center p-4 rounded-full w-10 h-10"
                      )}
                    >
                      {task.users[0].name.charAt(0).toUpperCase()}
                    </Text>
                  </Column>
                </Row>
              </Section>
              <Section>
                <Row>
                  <Text className="text-3xl text-gray-600 font-bold px-4">
                    Here is what {task.users[0].name.split(" ")[0]}{" "}
                    {task.users.length > 1 ? "& more" : undefined} finished...
                  </Text>
                  <Text className="text-lg font-medium text-gray-600 bg-gray-100 m-4 p-6">
                    {task.title} | {task.description}
                  </Text>
                </Row>
              </Section>
              <Section align="center">
                <Button
                  className="bg-lime-600 text-lg text-white mx-4 mt-8 py-5 px-52 rounded"
                  href={`${env.CLIENT}/users`}
                >
                  Track
                </Button>
              </Section>
            </Container>
          </Body>
        </React.Fragment>
      </Tailwind>
    </Html>
  );
}
