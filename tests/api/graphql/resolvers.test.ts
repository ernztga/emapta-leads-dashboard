import { supabase } from "../../../app/api/db/supabase";
import { resolvers } from "../../../app/api/schema/resolvers";

jest.mock("@/lib/supabase");

describe("GraphQL Resolvers", () => {
  const mockSupabase = supabase as jest.Mocked<typeof supabase>;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("leads query returns data", async () => {
    mockSupabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        order: jest
          .fn()
          .mockResolvedValue({
            data: [{ id: "1", name: "John" }],
            error: null,
          }),
      }),
    } as any);

    const result = await resolvers.Query.leads();
    expect(result).toEqual([{ id: "1", name: "John" }]);
  });

  test("lead query returns single lead", async () => {
    mockSupabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest
            .fn()
            .mockResolvedValue({
              data: { id: "1", name: "John" },
              error: null,
            }),
        }),
      }),
    } as any);

    const result = await resolvers.Query.lead(null, { id: "1" });
    expect(result).toEqual({ id: "1", name: "John" });
  });

  test("register mutation inserts lead", async () => {
    mockSupabase.from.mockReturnValue({
      insert: jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest
            .fn()
            .mockResolvedValue({
              data: { id: "1", name: "Jane" },
              error: null,
            }),
        }),
      }),
    } as any);

    const result = await resolvers.Mutation.register(null, {
      name: "Jane",
      email: "j@example.com",
      mobile: "123",
      postcode: "2000",
      delivery: true,
      pickup: false,
      payment: true,
    });
    expect(result).toEqual({ id: "1", name: "Jane" });
  });
});
