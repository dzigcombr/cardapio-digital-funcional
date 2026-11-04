import { Heart, Plus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuItem, money } from '@/lib/food-menu';

interface Props { item: MenuItem; favorite: boolean; onFavorite: () => void; onAdd: () => void; onDetails: () => void; }
export function MenuProduct({ item, favorite, onFavorite, onAdd, onDetails }: Props) {
  return <article className="food-product border border-border bg-card rounded-lg overflow-hidden">
    <div className="relative">
      <Button variant="ghost" className="block h-auto w-full p-0 rounded-none" onClick={onDetails} aria-label={`Ver detalhes de ${item.name}`}>
        <img src={item.image} alt={item.name} className="w-full aspect-[1.25] object-contain bg-card" />
      </Button>
      <Button variant="ghost" size="icon" className={`absolute right-2 top-2 bg-card/90 ${favorite ? 'text-primary' : 'text-foreground'}`} onClick={onFavorite} aria-label={`${favorite ? 'Remover' : 'Adicionar'} ${item.name} ${favorite ? 'dos' : 'aos'} favoritos`} aria-pressed={favorite} title="Favoritos">
        <Heart className={favorite ? 'fill-current' : ''} />
      </Button>
    </div>
    <div className="p-3 sm:p-4">
      <h2 className="text-base sm:text-lg font-bold leading-snug">{item.name}</h2>
      <p className="text-xs sm:text-sm text-muted-foreground mt-1 min-h-9">{item.subtitle}</p>
      <span className="inline-flex items-center gap-1 text-xs mt-2"><Star className="size-3 fill-current food-rating" /> {item.rating}{item.vegetarian && <span className="food-vegetarian ml-2">Vegetariano</span>}</span>
      <div className="flex items-center justify-between gap-1 mt-3"><strong className="text-sm sm:text-base">{money(item.price)}</strong><Button size="icon" className="h-9 w-9" onClick={onAdd} aria-label={`Adicionar ${item.name} ao carrinho`} title="Adicionar ao carrinho"><Plus /></Button></div>
    </div>
  </article>;
}