import { ModelIndicator } from "../../src/models/model_indicator";

describe("Model", () => {
    test("should stringify to estonian", () => {
        expect(ModelIndicator.Liquidity).toBe("likviidsus");
        expect(ModelIndicator.Efficiency).toBe("efektiivsus");
        expect(ModelIndicator.Structure).toBe("struktuur");
        expect(ModelIndicator.Profitability).toBe("tasuvus");
        expect(ModelIndicator.Growth).toBe("kasvu");
    });
});