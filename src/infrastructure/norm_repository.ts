export abstract class NormalisationRepository<T> {
  /**
   * Retrieves SDS (Standard Deviation Score) for a given cluster.
   * @param klaster - The cluster identifier.
   * @param correlationID - The correlation ID for the request.
   * @returns A promise that resolves to the SDS data.
   */
  abstract getSds(
    klaster: string,
    correlationID: string
  ): Promise<T>;

  /**
   * Retrieves MEA (Mean Error Average) for a given cluster.
   * @param klaster - The cluster identifier.
   * @param correlationID - The correlation ID for the request.
   * @returns A promise that resolves to the MEA data.
   */
  abstract getMea(
    klaster: string,
    correlationID: string
  ): Promise<T>;
}
