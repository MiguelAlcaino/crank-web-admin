// TODO: Create an interface for the gift card object

export interface GiftCard {
    site: string;
    description: string;
    salePrice: number;
    grandTotal: number;
    giftCardTerms: string;
    linkToPurchase: string;
    options: string;
}