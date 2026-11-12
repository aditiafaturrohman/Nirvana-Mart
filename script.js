const products=[
{id:1,name:"Keripik Singkong Original",cat:"snack",price:15000,old:18000,icon:"🥔",desc:"Keripik singkong renyah dengan rasa gurih."},
{id:2,name:"Biskuit Cokelat",cat:"snack",price:12000,old:14000,icon:"🍪",desc:"Camilan manis untuk teman santai."},
{id:3,name:"Teh Botol",cat:"minuman",price:7000,old:8000,icon:"🍾",desc:"Minuman teh praktis untuk aktivitas harian."},
{id:4,name:"Kopi Sachet",cat:"minuman",price:10000,old:12000,icon:"☕",desc:"Kopi sachet dengan aroma dan rasa nikmat."},
{id:5,name:"Air Mineral",cat:"minuman",price:5000,old:6000,icon:"💧",desc:"Air mineral untuk kebutuhan sehari-hari."},
{id:6,name:"Tisu Rumah Tangga",cat:"harian",price:11000,old:13000,icon:"🧻",desc:"Tisu lembut dan praktis untuk rumah."},
{id:7,name:"Sabun Mandi",cat:"harian",price:8000,old:10000,icon:"🧼",desc:"Sabun mandi untuk kebersihan keluarga."},
{id:8,name:"Mi Instan",cat:"harian",price:4000,old:5000,icon:"🍜",desc:"Pilihan praktis untuk stok makanan."},
{id:9,name:"Paket Ngemil",cat:"paket",price:35000,old:42000,icon:"🎁",desc:"Keripik + biskuit + minuman."},
{id:10,name:"Paket Keluarga",cat:"paket",price:80000,old:100000,icon:"🛍️",desc:"Paket hemat berisi 6 produk pilihan."},
{id:11,name:"Paket Minuman",cat:"paket",price:28000,old:33000,icon:"🥤",desc:"Teh + kopi + air mineral."}
];
let cart=[];
const rupiah=n=>"Rp"+n.toLocaleString("id-ID");
function renderProducts(cat="all"){
 const grid=document.getElementById("productGrid");
 grid.innerHTML=products.filter(p=>cat==="all"||p.cat===cat).map(p=>`
 <article class="product">
  <div class="product-img">${p.icon}</div><div class="product-body">
   <span class="badge">${p.old>p.price?"PROMO":"PILIHAN"}</span>
   <h3>${p.name}</h3><p>${p.desc}</p>
   <div><span class="price">${rupiah(p.price)}</span> <del style="font-size:11px;color:#999">${rupiah(p.old)}</del></div>
   <div class="product-actions"><button class="small-btn outline" onclick="detail(${p.id})">Detail</button><button class="small-btn" onclick="addToCart(${p.id})">+ Keranjang</button></div>
  </div>
 </article>`).join("");
}
function detail(id){
 const p=products.find(x=>x.id===id);
 document.getElementById("modalContent").innerHTML=`<button class="close" onclick="closeModal()">×</button><div class="detail-img">${p.icon}</div><p class="eyebrow">DETAIL PRODUK</p><h2>${p.name}</h2><p>${p.desc}</p><h3>${rupiah(p.price)} <del style="font-size:13px;color:#999">${rupiah(p.old)}</del></h3><button class="btn primary full" onclick="addToCart(${p.id});closeModal()">Tambah ke Keranjang</button>`;
 document.getElementById("modal").classList.remove("hidden");
}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function addToCart(id){const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});updateCart();openCart();}
function updateCart(){document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0)}
function openCart(){
 const box=document.getElementById("cartItems");
 if(!cart.length) box.innerHTML='<p>Keranjang masih kosong. Yuk pilih produk dulu.</p>';
 else box.innerHTML=cart.map(x=>{let p=products.find(y=>y.id===x.id);return `<div class="cart-row"><div><b>${p.icon} ${p.name}</b><br><small>${rupiah(p.price)} × ${x.qty}</small></div><button class="small-btn" style="flex:0 0 auto" onclick="removeItem(${p.id})">Hapus</button></div>`}).join("");
 document.getElementById("cartTotal").textContent=rupiah(cart.reduce((s,x)=>s+products.find(y=>y.id===x.id).price*x.qty,0));
 document.getElementById("cartModal").classList.remove("hidden");
}
function closeCart(){document.getElementById("cartModal").classList.add("hidden")}
function removeItem(id){cart=cart.filter(x=>x.id!==id);updateCart();openCart()}
function checkout(){
 if(!cart.length){alert("Keranjang masih kosong.");return}
 alert("Demo checkout berhasil! Pada implementasi nyata, data pesanan dapat diteruskan ke WhatsApp/admin.");
}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.cat)}));
renderProducts();
