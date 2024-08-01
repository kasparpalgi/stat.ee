export enum ModelIndicator {
    Liquidity = 'likviidsus',
    Efficiency = 'efektiivsus',
    Structure = 'struktuur',
    Profitability = 'tasuvus',
    Growth = 'kasvu'
}

export function parseModelIndicator(indicator: string): ModelIndicator {
    switch (indicator) {
        case 'likviidsus':
            return ModelIndicator.Liquidity;
        case 'efektiivsus':
            return ModelIndicator.Efficiency;
        case 'struktuur':
            return ModelIndicator.Structure;
        case 'tasuvus':
            return ModelIndicator.Profitability;
        case 'kasvu':
            return ModelIndicator.Growth;
        default:
            throw new Error('Invalid indicator');
    }
}

