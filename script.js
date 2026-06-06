const SUPABASE_URL = "https://rhqskrmhehaobliozhmx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJocXNrcm1oZWhhb2JsaW96aG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2MTE5NDksImV4cCI6MjA5NjE4Nzk0OX0.GY46K3uGICMR8Ltvj3_jk7APwzmybnGSM1rDU-6IP8k";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ===== Navbar scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backTop').classList.toggle('show', window.scrollY > 500);
});

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));

// ===== Back to top =====
document.getElementById('backTop').addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Property data =====
const properties = [
  { name:'Grand Residence Bogor', loc:'Bogor, Jawa Barat', land:120, build:90, bed:3, bath:2, price:'Rp 850 Juta', badge:'Best Seller', badgeClass:'',
    img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { name:'Emerald City Sentul', loc:'Sentul, Bogor', land:150, build:110, bed:4, bath:3, price:'Rp 1,4 Miliar', badge:'Promo', badgeClass:'red',
    img:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' },
  { name:'Royal Green Residence', loc:'Depok, Jawa Barat', land:90, build:70, bed:2, bath:2, price:'Rp 650 Juta', badge:'Ready Stock', badgeClass:'green',
    img:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80' },
  { name:'Citra Harmoni Estate', loc:'Tangerang Selatan', land:200, build:160, bed:4, bath:3, price:'Rp 2 Miliar', badge:'Best Seller', badgeClass:'',
    img:'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80' },
  { name:'Golden Hills Residence', loc:'Bandung, Jawa Barat', land:100, build:80, bed:3, bath:2, price:'Rp 750 Juta', badge:'Promo', badgeClass:'red',
    img:'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80' },
  { name:'Permata Asri Village', loc:'Bekasi, Jawa Barat', land:84, build:60, bed:2, bath:1, price:'Rp 450 Juta', badge:'Ready Stock', badgeClass:'green',
    img:'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80' },
];

const grid = document.getElementById('propertyGrid');
grid.innerHTML = properties.map(p => `
  <article class="card property reveal">
    <div class="img-wrap">
      <span class="badge ${p.badgeClass}">${p.badge}</span>
      <img src="${p.img}" alt="${p.name}" loading="lazy"/>
    </div>
    <div class="property-body">
      <h3>${p.name}</h3>
      <p class="loc">📍 ${p.loc}</p>
      <div class="specs">
        <span><strong>LT:</strong> ${p.land} m²</span>
        <span><strong>LB:</strong> ${p.build} m²</span>
        <span>🛏 ${p.bed} Kamar Tidur</span>
        <span>🛁 ${p.bath} Kamar Mandi</span>
      </div>
      <div class="price">${p.price}</div>
      <a href="https://wa.me/6281234567890?text=Saya tertarik dengan ${encodeURIComponent(p.name)}" class="btn btn-gold">Lihat Detail</a>
    </div>
  </article>
`).join('');

// Re-observe newly added cards
document.querySelectorAll('.property.reveal').forEach(el => io.observe(el));

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// ===== Investment chart =====
const ctx = document.getElementById('investChart');
if (ctx && window.Chart) {
  new Chart(ctx, {
    type:'line',
    data:{
      labels:['2021','2022','2023','2024','2025'],
      datasets:[{
        label:'Nilai Properti (Juta Rp)',
        data:[500,575,650,760,900],
        borderColor:'#D4AF37',
        backgroundColor:(c)=>{
          const g = c.chart.ctx.createLinearGradient(0,0,0,300);
          g.addColorStop(0,'rgba(212,175,55,0.45)');
          g.addColorStop(1,'rgba(212,175,55,0.02)');
          return g;
        },
        fill:true, tension:.4,
        pointBackgroundColor:'#0F172A', pointBorderColor:'#D4AF37',
        pointBorderWidth:2, pointRadius:6, pointHoverRadius:8, borderWidth:3,
      }]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{display:false}, tooltip:{
        backgroundColor:'#0F172A', padding:12, titleColor:'#D4AF37',
        callbacks:{ label:(c)=>` Rp ${c.parsed.y} Juta` }
      }},
      scales:{
        y:{ ticks:{ callback:v=>'Rp '+v+'jt', color:'#6b7280' }, grid:{color:'rgba(0,0,0,0.05)'} },
        x:{ ticks:{color:'#6b7280'}, grid:{display:false} }
      }
    }
  });
}

// ===== Form validation =====
const form = document.getElementById("consultForm");
const msg = document.getElementById("formMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector("button[type='submit']");
  const data = Object.fromEntries(new FormData(form));

  if (!data.nama || data.nama.length < 3) {
    return showMsg("Mohon masukkan nama lengkap.", "err");
  }

  if (!/^[0-9+\-\s]{8,}$/.test(data.wa)) {
    return showMsg("Nomor WhatsApp tidak valid.", "err");
  }

  if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    return showMsg("Email tidak valid.", "err");
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = "Mengirim...";

  try {

    const { error } = await supabaseClient
      .from("leads")
      .insert([
        {
          nama: data.nama,
          whatsapp: data.wa,
          email: data.email,
          pesan: data.pesan
        }
      ]);

    if (error) throw error;

    showMsg("Data berhasil dikirim.", "ok");

    const waText = `
Halo Admin Sukses Properti

Saya tertarik dengan properti yang ditawarkan.

Nama : ${data.nama}
WhatsApp : ${data.wa}
Email : ${data.email}

Pesan :
${data.pesan}
`;

    setTimeout(() => {

      window.open(
        `https://wa.me/6285819098540?text=${encodeURIComponent(waText)}`,
        "_blank"
      );

      form.reset();

    }, 1000);

  }
  catch (err) {

  console.error(err);

  showMsg(
    err.message || "Terjadi kesalahan",
    "err"
  );

}
  finally {

    submitBtn.disabled = false;
    submitBtn.innerHTML = "Konsultasi Gratis Sekarang";

  }

});
function showMsg(text, type) {
  msg.textContent = text;
  msg.className = `form-msg ${type}`;

  setTimeout(() => {
    msg.textContent = "";
    msg.className = "form-msg";
  }, 5000);
}

// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();
