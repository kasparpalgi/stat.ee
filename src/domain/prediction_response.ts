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
    
    // Nullable fields
    @JsonProperty()
    model5y1: number | null
    @JsonProperty()
    model5y2: number | null
    @JsonProperty()
    model5y3: number | null


    constructor() {
        super()
        this.model1y1 = 0
        this.model1y2 = 0
        this.model1y3 = 0
        this.model2y1 = 0
        this.model2y2 = 0
        this.model2y3 = 0
        this.model3y1 = 0
        this.model3y2 = 0
        this.model3y3 = 0
        this.model4y1 = 0
        this.model4y2 = 0
        this.model4y3 = 0
        this.model5y1 = null
        this.model5y2 = null
        this.model5y3 = null
    }
}