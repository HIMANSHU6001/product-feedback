export interface Product {
  productName: string;
  feedBacks: {
    rating: number;
    userType: string;
    occupation: string;
    state: string;
    favoriteFeature: string;
    productAppearanceRating: number;
    comments: string;
  }[];
}

export class ProductModel implements Product {
  productName: string;
  feedBacks: {
    rating: number;
    userType: string;
    occupation: string;
    state: string;
    favoriteFeature: string;
    productAppearanceRating: number;
    comments: string;
  }[];

  constructor(product: Partial<Product>) {
    this.productName = product.productName || "";
    this.feedBacks = product.feedBacks || [
      {
        rating: 0,
        userType: "",
        occupation: "",
        state: "",
        favoriteFeature: "",
        productAppearanceRating: 0,
        comments: ""
      }
    ];
  }
}
