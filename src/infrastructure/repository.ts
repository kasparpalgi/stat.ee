import { Company, CompanyYear } from "./models";

export abstract class NormalisationRepository<T> {
    /**
     * Retrieves SDS (Standard Deviation Score) for a given cluster.
     * @param klaster - The cluster identifier.
     * @param normSuffix - Which suffix for normalization to use, old or new.
     * @param correlationID - The correlation ID for the request.
     * @returns A promise that resolves to the SDS data.
     */
    abstract getSds(klaster: string, normSuffix: string, correlationID: string): Promise<T>;

    /**
     * Retrieves MEA (Mean Error Average) for a given cluster.
     * @param klaster - The cluster identifier.
     * @param normSuffix - Which suffix for normalization to use, old or new.
     * @param correlationID - The correlation ID for the request.
     * @returns A promise that resolves to the MEA data.
     */
    abstract getMea(klaster: string, normSuffix: string, correlationID: string): Promise<T>;
}

export abstract class DataRepository<T> {
    /**
     * Retrieves data by a given ID and based on a hard-coded maxium capacity.
     * @param id - The ID of the company.
     * @param correlationID - The correlation ID for the request.
     * @returns A promise that resolves to the [T] as data.
     */
    abstract getCompanyCurrentStatus(id: string, correlationID: string): Promise<Company>;
}