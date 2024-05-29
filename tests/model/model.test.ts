import { Indicator } from "../../src/enums/indicator_enum";

describe("Model", () => {
    test("should stringify to estonian", () => {
        expect(Indicator.Liquidity).toBe("likviidsus");
        expect(Indicator.Efficiency).toBe("efektiivsus");
        expect(Indicator.Structure).toBe("struktuur");
        expect(Indicator.Profitability).toBe("tasuvus");
        expect(Indicator.Growth).toBe("kasvu");
    });
});