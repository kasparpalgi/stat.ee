import { JsonProperty, SerializableEntity } from "ts-jackson"

export  class PredictionResponse extends SerializableEntity {
    @JsonProperty()
    model1y1: number
    @JsonProperty()
    model1y2: number
    @JsonProperty()
    model1y3: number
    @JsonProperty()
    model2y1: number
    @JsonProperty()
    model2y2: number
    @JsonProperty()
    model2y3: number
    @JsonProperty()
    model3y1: number
    @JsonProperty()
    model3y2: number
    @JsonProperty()
    model3y3: number
    @JsonProperty()
    model4y1: number
    @JsonProperty()
    model4y2: number
    @JsonProperty()
    model4y3: number
    @JsonProperty()
    model5y1: number
    @JsonProperty()
    model5y2: number
    @JsonProperty()
    model5y3: number
}