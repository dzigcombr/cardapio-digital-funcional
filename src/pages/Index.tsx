import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChefHat, Heart, Home, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Trash2, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuProduct } from '@/components/MenuProduct';
import { Cart, MenuItem, cartCount, cartItems, cartTotal, changeQuantity, menu, money } from '@/lib/food-menu';
import { toast } from 'sonner';

type Order = { items: ReturnType<typeof cartItems>; total: number; name: string; address: string; payment: string; id: string; notes: string };
const categories = [{ id: 'all', label: 'Todos' }, { id: 'combos', label: 'Combos' }, { id: 'sliders', label: 'Mini burgers' }, { id: 'classic', label: 'Clássicos' }];
const Index = () => {
  const [params, setParams] = useSearchParams();
  const view = params.get('tela') || 'menu';
  const [cart, setCart] = useState<Cart>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);
  const [sort, setSort] = useState('default');
  const [details, setDetails] = useState<MenuItem | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('Pix');
  const [notes, setNotes] = useState('');
  const count = cartCount(cart);
  const total = cartTotal(cart);
  const items = cartItems(cart);
  const go = (next: string) => { setParams(next === 'menu' ? {} : { tela: next }); window.scrollTo({ top: 0 }); };
  const add = (id: string) => { setCart(current => changeQuantity(current, id, 1)); toast.success('Adicionado ao carrinho'); };
  const toggleFavorite = (id: string) => setFavorites(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  const products = menu.filter(item => (view !== 'favoritos' || favorites.includes(item.id)) && (category === 'all' || item.category === category) && (!vegetarian || item.vegetarian) && `${item.name} ${item.subtitle} ${item.description}`.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'))).sort((a, b) => sort === 'price' ? a.price - b.price : sort === 'rating' ? Number(b.rating) - Number(a.rating) : 0);
  const complete = (event: React.FormEvent) => {
    event.preventDefault();
    if (!items.length || !name.trim() || !address.trim()) return;
    setOrder({ items, total, name: name.trim(), address: address.trim(), payment, notes: notes.trim(), id: `FG-${Date.now().toString().slice(-6)}` });
    setCart({}); go('final');
  };
  const empty = (icon: React.ReactNode, title: string, text: string) => <div className="text-center py-16 px-4"><div className="food-empty-icon mx-auto mb-5">{icon}</div><h2 className="font-bold text-xl">{title}</h2><p className="text-muted-foreground text-sm mt-2 mb-6">{text}</p><Button onClick={() => { setCategory('all'); setSearch(''); setVegetarian(false); go('menu'); }}>Explorar cardápio <ArrowRight /></Button></div>;
  return <div className="food-app min-h-screen">
    <div className="food-shell mx-auto min-h-screen bg-background pb-28">
      <header className="px-5 sm:px-7 pt-7 pb-6 flex items-center justify-between gap-4">
        <div><Link to="/" onClick={() => go('menu')} className="food-logo text-4xl font-bold">Foodgo<span className="text-primary">.</span></Link><p className="text-sm text-muted-foreground mt-1">Seu próximo favorito está aqui.</p></div>
        <div className="food-brand-icon"><UtensilsCrossed className="size-6" /></div>
      </header>
      <main className="px-5 sm:px-7">
        {(view === 'menu' || view === 'favoritos') && <>
          {view === 'favoritos' && <h1 className="text-2xl font-bold mb-5">Seus favoritos <span className="text-primary">{favorites.length}</span></h1>}
          <div className="flex gap-3"><div className="relative flex-1 min-w-0"><Search className="absolute left-4 top-4 size-5 text-muted-foreground" /><Input className="h-13 h-[52px] pl-12 border-0 bg-muted" placeholder="O que vai ser hoje?" aria-label="Buscar no cardápio" value={search} onChange={event => setSearch(event.target.value)} /></div><Button size="icon" className="h-[52px] w-[52px] shrink-0" onClick={() => setFiltersOpen(true)} aria-label="Filtrar cardápio" title="Filtrar cardápio"><SlidersHorizontal /></Button></div>
          <nav className="flex gap-2 overflow-x-auto py-6" aria-label="Categorias">{categories.map(item => <Button key={item.id} variant={category === item.id ? 'default' : 'secondary'} className="shrink-0" aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}</Button>)}</nav>
          <div className="flex items-center justify-between mb-4"><h1 className="text-lg font-bold">{view === 'favoritos' ? 'Salvos por você' : 'Feitos para sua fome'}</h1><span className="text-xs text-muted-foreground">{products.length} opções</span></div>
          {products.length ? <div className="grid grid-cols-2 gap-3 sm:gap-4">{products.map(item => <MenuProduct key={item.id} item={item} favorite={favorites.includes(item.id)} onFavorite={() => toggleFavorite(item.id)} onAdd={() => add(item.id)} onDetails={() => setDetails(item)} />)}</div> : empty(<Heart />, view === 'favoritos' && !favorites.length ? 'Ainda sem favoritos' : 'Nenhum item encontrado', view === 'favoritos' && !favorites.length ? 'Seus sabores preferidos ficam guardados aqui.' : 'Tente outra busca ou escolha uma categoria diferente.')}
          {view === 'menu' && <Button asChild variant="link" className="mt-6 text-muted-foreground text-xs"><Link to="/medical">Acessar App Médico <ArrowRight /></Link></Button>}
        </>}
        {(view === 'carrinho' || view === 'checkout') && <>
          <div className="flex items-center gap-3 mb-6"><Button variant="ghost" size="icon" onClick={() => go(view === 'checkout' ? 'carrinho' : 'menu')} aria-label="Voltar"><ArrowLeft /></Button><h1 className="text-2xl font-bold">{view === 'checkout' ? 'Finalizar pedido' : 'Seu carrinho'}</h1><span className="text-muted-foreground text-sm ml-auto">{count} {count === 1 ? 'item' : 'itens'}</span></div>
          {!items.length ? empty(<ShoppingBag />, 'Seu carrinho está vazio', 'Que tal começar com um burger?') : <>
            <div className="divide-y divide-border">{items.map(item => <article key={item.id} className="flex items-center gap-3 py-5"><img src={item.image} alt={item.name} className="w-20 h-20 object-contain shrink-0" /><div className="flex-1 min-w-0"><h2 className="text-sm font-bold">{item.name}</h2><p className="text-sm text-muted-foreground mt-1">{money(item.price)}</p><div className="flex items-center gap-2 mt-2"><Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCart(current => changeQuantity(current, item.id, -1))} aria-label={`Diminuir ${item.name}`}><Minus /></Button><span className="text-sm w-5 text-center" aria-label={`Quantidade de ${item.name}`}>{item.quantity}</span><Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCart(current => changeQuantity(current, item.id, 1))} aria-label={`Aumentar ${item.name}`}><Plus /></Button></div></div><div className="text-right"><strong className="text-sm">{money(item.price * item.quantity)}</strong><Button variant="ghost" size="icon" className="block ml-auto mt-2 text-muted-foreground" onClick={() => setCart(current => { const next = { ...current }; delete next[item.id]; return next; })} aria-label={`Remover ${item.name} do carrinho`}><Trash2 /></Button></div></article>)}</div>
            <div className="border-t border-border mt-4 pt-5"><div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>{money(total)}</span></div><div className="flex justify-between text-sm text-muted-foreground mt-2"><span>Entrega</span><span>A combinar</span></div><div className="flex justify-between font-bold text-xl mt-5"><span>Total dos itens</span><span>{money(total)}</span></div></div>
            {view === 'carrinho' ? <div className="mt-7 space-y-3"><Button className="w-full h-12" onClick={() => go('checkout')}>Continuar <ArrowRight /></Button><Button variant="ghost" className="w-full" onClick={() => go('menu')}>Adicionar mais itens</Button></div> : <form onSubmit={complete} className="mt-7 space-y-4">
              <h2 className="font-bold text-lg">Dados de entrega</h2>
              <label className="block text-sm font-medium">Seu nome<Input value={name} onChange={event => setName(event.target.value)} required maxLength={100} autoComplete="name" placeholder="Nome completo" className="mt-2" /></label>
              <label className="block text-sm font-medium">Endereço completo<Input value={address} onChange={event => setAddress(event.target.value)} required maxLength={250} autoComplete="street-address" placeholder="Rua, número, bairro e cidade" className="mt-2" /></label>
              <label className="block text-sm font-medium">Forma de pagamento</label><Select value={payment} onValueChange={setPayment}><SelectTrigger aria-label="Forma de pagamento"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Pix">Pix</SelectItem><SelectItem value="Cartão na entrega">Cartão na entrega</SelectItem><SelectItem value="Dinheiro">Dinheiro</SelectItem></SelectContent></Select>
              <label className="block text-sm font-medium">Observações <span className="text-muted-foreground font-normal">(opcional)</span><Input value={notes} onChange={event => setNotes(event.target.value)} maxLength={300} placeholder="Ex.: sem cebola" className="mt-2" /></label>
              <p className="food-demo-note text-xs p-3 rounded-md leading-relaxed">Pedido demonstrativo. Nenhum pagamento será cobrado e nenhum pedido será enviado ao restaurante.</p>
              <Button type="submit" className="w-full h-12">Concluir demonstração <Check /></Button>
            </form>}
          </>}
        </>}
        {view === 'final' && (order ? <section className="pt-5">
          <div className="food-success-icon mx-auto"><Check className="size-9" /></div><div className="text-center mt-5"><span className="text-xs font-semibold text-muted-foreground uppercase">{order.id} · Demonstração</span><h1 className="text-3xl font-bold mt-3">Tudo pronto, {order.name.split(' ')[0]}!</h1><p className="text-muted-foreground text-sm mt-3">Seu pedido de demonstração foi concluído.</p></div>
          <h2 className="text-lg font-bold mt-9 mb-3">Resumo do pedido</h2><div className="divide-y divide-border">{order.items.map(item => <div key={item.id} className="flex gap-3 items-center py-3"><img src={item.image} alt={item.name} className="size-14 object-contain" /><span className="text-sm flex-1">{item.quantity} × {item.name}</span><strong className="text-sm">{money(item.price * item.quantity)}</strong></div>)}</div><div className="border-t border-border flex justify-between py-5 font-bold"><span>Total dos itens</span><span>{money(order.total)}</span></div>
          <dl className="border-t border-border pt-5 text-sm space-y-4"><div><dt className="text-muted-foreground">Entrega para</dt><dd className="mt-1 font-medium break-words">{order.name}<br />{order.address}</dd></div><div><dt className="text-muted-foreground">Pagamento escolhido</dt><dd className="mt-1 font-medium">{order.payment} · Não cobrado</dd></div>{order.notes && <div><dt className="text-muted-foreground">Observações</dt><dd className="mt-1 break-words">{order.notes}</dd></div>}</dl><p className="food-demo-note text-xs p-3 rounded-md mt-6">Esta confirmação não foi enviada a um restaurante.</p><Button className="w-full h-12 mt-6" onClick={() => go('menu')}>Voltar ao cardápio <ArrowRight /></Button>
        </section> : empty(<ChefHat />, 'Nenhum pedido por aqui', 'Escolha seus itens para começar.'))}
        {!['menu', 'favoritos', 'carrinho', 'checkout', 'final'].includes(view) && empty(<Home />, 'Vamos ao cardápio?', 'Encontre seu próximo favorito.')}
      </main>
      <nav className="food-bottom-nav fixed bottom-0 z-30 border-t border-border bg-background/95 flex items-center justify-around" aria-label="Navegação principal">
        {[{ id: 'menu', label: 'Cardápio', Icon: Home }, { id: 'favoritos', label: 'Favoritos', Icon: Heart }, { id: 'carrinho', label: 'Carrinho', Icon: ShoppingBag }].map(({ id, label, Icon }) => <Button key={id} variant="ghost" className={`relative flex-col h-16 gap-1 w-24 text-xs ${view === id || (id === 'carrinho' && view === 'checkout') ? 'text-primary' : 'text-muted-foreground'}`} onClick={() => go(id)} aria-current={view === id ? 'page' : undefined}><Icon className="!size-5" />{label}{id === 'carrinho' && count > 0 && <span className="absolute top-1 right-6 bg-primary text-primary-foreground rounded-full min-w-5 h-5 px-1 flex items-center justify-center text-[10px]">{count}</span>}</Button>)}
      </nav>
    </div>
    <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}><DialogContent className="food-app max-w-[calc(100%-2rem)] sm:max-w-sm"><DialogTitle>Do seu jeito</DialogTitle><DialogDescription>Escolha suas preferências.</DialogDescription><label className="flex items-center justify-between text-sm py-3">Somente vegetarianos<input type="checkbox" checked={vegetarian} onChange={event => setVegetarian(event.target.checked)} className="accent-primary size-4" /></label><Select value={sort} onValueChange={setSort}><SelectTrigger aria-label="Ordenar cardápio"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="default">Ordem do cardápio</SelectItem><SelectItem value="price">Menor preço</SelectItem><SelectItem value="rating">Melhor avaliação</SelectItem></SelectContent></Select><Button onClick={() => setFiltersOpen(false)}>Ver opções</Button><Button variant="ghost" onClick={() => { setVegetarian(false); setSort('default'); }}>Limpar filtros</Button></DialogContent></Dialog>
    <Dialog open={details !== null} onOpenChange={open => { if (!open) setDetails(null); }}><DialogContent className="food-app max-w-[calc(100%-2rem)] sm:max-w-sm">{details && <><img src={details.image} alt={details.name} className="w-full aspect-[1.5] object-contain" /><DialogTitle>{details.name}</DialogTitle><DialogDescription>{details.description}</DialogDescription><div className="flex justify-between items-center"><strong className="text-xl">{money(details.price)}</strong><Button onClick={() => { add(details.id); setDetails(null); }}><Plus /> Adicionar</Button></div></>}</DialogContent></Dialog>
  </div>;
};
export default Index;
