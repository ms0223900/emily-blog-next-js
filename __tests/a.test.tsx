import Page, { PostWithIdItem } from "@/app/post/[id]/page";
import { render, screen } from "@testing-library/react";

const mockFn = jest.fn();
jest.mock("@/repos/post/PostRepository", () => ({
  getPostById: () => mockFn(),
}));

beforeEach(() => {
  mockFn.mockResolvedValue({
    id: "1",
    description: "hi",
    content: "hieeel",
  });
});

it("test component", () => {
  render(
    <PostWithIdItem
      post={{
        id: "",
        title: "",
        description: "hi",
        content: "",
      }}
    />
  );

  const h2El = screen.queryByRole("heading", {
    level: 2,
  });

  expect(h2El).toHaveTextContent("hi");
});
