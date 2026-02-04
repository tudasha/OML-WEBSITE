

# Modificare secțiune înscrieri - Lista de așteptare OML IV

## Rezumat
Voi actualiza secțiunea "Vrei să urci pe scenă?" de pe pagina de eveniment pentru a include informații despre lista de așteptare pentru OML IV (Aprilie 2026) și un buton care trimite către formularul Google.

## Ce se va schimba

### Pagina Event.tsx - Secțiunea când înscrierile sunt închise

**Mesaj actual:**
- "Înscrierile pentru această ediție s-au încheiat"
- "Urmărește-ne pe Instagram pentru a afla când se deschid înscrierile"
- Buton: "Contactează-ne pentru mai multe informații"

**Mesaj nou:**
- "Înscrierile pentru această ediție s-au încheiat"
- Explicație despre lista de așteptare pentru OML IV (Aprilie 2026)
- Menționare că datorită cererii mari, selecția va prioritiza participanții noi
- Buton: "Înscrie-te pe lista de așteptare" cu link către formularul Google

## Detalii tehnice

Voi modifica secțiunea din `src/pages/Event.tsx` (liniile 186-202):

```tsx
{/* Când registrationOpen este false */}
<>
  <div className="flex items-center justify-center gap-2 text-primary mb-4">
    <AlertCircle className="w-5 h-5" />
    <span className="font-medium">Înscrierile pentru această ediție s-au încheiat</span>
  </div>
  <p className="text-white/70 mb-4">
    Datorită cererii foarte mari, am creat o listă de așteptare pentru OML IV (Aprilie 2026).
  </p>
  <p className="text-white/70 mb-6">
    Selecția va prioritiza participanții noi care nu au urcat încă pe scenă.
  </p>
  <Button
    asChild
    size="lg"
    className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg"
  >
    <a 
      href="https://docs.google.com/forms/d/1yuxtAXxGX3ZsG0e7_603LkUzu4FuY9XDuXb5bN1guW4/viewform" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      Înscrie-te pe lista de așteptare
    </a>
  </Button>
</>
```

## Notă importantă
Am convertit link-ul din modul de editare (`/edit`) în link-ul public pentru completare (`/viewform`), astfel încât utilizatorii să poată accesa formularul corect.

