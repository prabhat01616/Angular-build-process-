import { Component, computed, signal } from '@angular/core';

type Product = { id: number; name: string; category: string; price: number; image: string; badge?: string; tone: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly categories = ['All', 'Home', 'Tech', 'Accessories', 'Wellness'];
  protected readonly products: Product[] = [
    { id: 1, name: 'Everyday ceramic mug', category: 'Home', price: 24, image: 'photo-1514228742587-6b1558fcca3d', badge: 'Bestseller', tone: 'sand' },
    { id: 2, name: 'Studio wireless headphones', category: 'Tech', price: 89, image: 'photo-1505740420928-5e560c06d30e', badge: 'New', tone: 'lavender' },
    { id: 3, name: 'Soft-knit lounge throw', category: 'Home', price: 68, image: 'photo-1600210492486-724fe5c67fb0', tone: 'sage' },
    { id: 4, name: 'Everywhere leather tote', category: 'Accessories', price: 112, image: 'photo-1548036328-c9fa89d128fa', tone: 'rose' },
    { id: 5, name: 'Daily ritual candle', category: 'Wellness', price: 32, image: 'photo-1603006905003-be475563bc59', badge: 'Loved', tone: 'peach' },
    { id: 6, name: 'Minimal desk lamp', category: 'Home', price: 76, image: 'photo-1507473885765-e6ed057f782c', tone: 'blue' },
    { id: 7, name: 'Pocket film camera', category: 'Tech', price: 149, image: 'photo-1516035069371-29a1b244cc32', badge: 'Popular', tone: 'mint' },
    { id: 8, name: 'Cloud-soft eye mask', category: 'Wellness', price: 28, image: 'photo-1515886657613-9f3515b0c78f', tone: 'lilac' },
  ];
  protected readonly selectedCategory = signal('All');
  protected readonly search = signal('');
  protected readonly cart = signal<number[]>([]);
  protected readonly cartOpen = signal(false);
  protected readonly filteredProducts = computed(() => this.products.filter(product =>
    (this.selectedCategory() === 'All' || product.category === this.selectedCategory()) &&
    product.name.toLowerCase().includes(this.search().trim().toLowerCase())
  ));
  protected readonly cartProducts = computed(() => this.cart().map(id => this.products.find(product => product.id === id)!).filter(Boolean));
  protected readonly cartTotal = computed(() => this.cartProducts().reduce((total, product) => total + product.price, 0));

  protected setCategory(category: string): void { this.selectedCategory.set(category); }
  protected addToCart(id: number): void { this.cart.update(items => [...items, id]); }
  protected removeFromCart(index: number): void { this.cart.update(items => items.filter((_, itemIndex) => itemIndex !== index)); }
  protected updateSearch(event: Event): void { this.search.set((event.target as HTMLInputElement).value); }
  protected imageUrl(image: string): string { return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=900&q=85`; }
}
