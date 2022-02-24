import {of} from "rxjs";
import {ProductListComponent} from "./product-list.component";

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let PRODUCTS;
  let mockProductService;
  let mockActivatedRoute;

  beforeEach(() => {

    PRODUCTS = [
      {
        id: 1,
        productName: 'Leaf Rake',
        productCode: 'GDN-0011',
        releaseDate: 'March 19, 2018',
        description: 'Leaf rake with 48-inch wooden handle',
        price: 19.95,
        starRating: 3.2,
        imageUrl: 'assets/images/leaf_rake.png',
        category: 'Garden',
        tags: ['rake', 'leaf', 'yard', 'home']
      },
      {
        id: 2,
        productName: 'Garden Cart',
        productCode: 'GDN-0023',
        releaseDate: 'March 18, 2018',
        description: '15 gallon capacity rolling garden cart',
        price: 32.99,
        starRating: 4.2,
        imageUrl: 'assets/images/garden_cart.png',
        category: 'Garden'
      },
      {
        id: 5,
        productName: 'Hammer',
        productCode: 'TBX-0048',
        releaseDate: 'May 21, 2018',
        description: 'Curved claw steel hammer',
        price: 8.9,
        starRating: 4.8,
        imageUrl: 'assets/images/hammer.png',
        category: 'Toolbox',
        tags: ['tools', 'hammer', 'construction']
      },

    ];

    mockProductService = jasmine.createSpyObj(['getProducts', 'deleteProduct']);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '2';
          }
        }
      }
    };

    component = new ProductListComponent(mockProductService, mockActivatedRoute);

  });

  describe('getProduct', () => {

    it('should show products list', () => {
      mockProductService.getProducts.and.returnValue(of());
      component.products = PRODUCTS;

      expect(component.products.length).toBe(3);
    })

  });

  describe('deleteProduct', () => {

    // mocking isolated code
    it('should remove the indicated product from the products list', () => {
      mockProductService.deleteProduct.and.returnValue(of(true));
      component.products = PRODUCTS;

      component.delete(PRODUCTS[2]);

      expect(component.products.length).toBe(2)
    })


    // testing interactions
    it('should call deleteProduct', () => {
      mockProductService.deleteProduct.and.returnValue(of(true));
      component.products = PRODUCTS;

      component.delete(PRODUCTS[0]);

      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(PRODUCTS[0].id);
    })
  })

})
