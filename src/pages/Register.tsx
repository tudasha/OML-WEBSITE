import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Loader2, Ticket, User, Mail, Utensils, Map, Camera, ShieldCheck, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Layout from "@/components/Layout";
import heroConcert from "@/assets/hero-concert.png";

const API_URL = import.meta.env.VITE_API_URL || "";
const STRIPE_DONATION_LINK = "https://donate.stripe.com/4gMdR2esj3js2SD8BO6oo00";

interface FormData {
  fullName: string;
  age: string;
  email: string;
  referralSource: string;
  dietaryRestrictions: string;
  mediaConsent: boolean;
  hasParentalConsent: boolean;
  hasAcceptedTerms: boolean;
}

const Register = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wantsToDonate, setWantsToDonate] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    age: "",
    email: "",
    referralSource: "",
    dietaryRestrictions: "",
    mediaConsent: false,
    hasParentalConsent: false,
    hasAcceptedTerms: false,
  });

  const age = parseInt(formData.age) || 0;
  const isOver18 = age >= 18;
  const isUnder18WithAge = formData.age !== "" && age > 0 && !isOver18;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast({ title: "Eroare", description: "Numele complet este obligatoriu.", variant: "destructive" });
      return;
    }
    if (!formData.age || age < 1 || age > 120) {
      toast({ title: "Eroare", description: "Te rugăm să introduci o vârstă validă.", variant: "destructive" });
      return;
    }
    if (!formData.hasAcceptedTerms) {
      toast({ title: "Eroare", description: "Te rugăm să accepți Regulamentul și Termenii de GDPR pentru a continua.", variant: "destructive" });
      return;
    }
    if (!formData.mediaConsent) {
      toast({ title: "Eroare", description: "Avem nevoie de acordul tău pentru foto/video la participare.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    // Setăm un timeout de 15 secunde deoarece serverul gratuit Render intră în stand-by
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        age,
        email: formData.email.trim() || null,
        referralSource: formData.referralSource || null,
        dietaryRestrictions: formData.dietaryRestrictions.trim() || null,
        mediaConsent: formData.mediaConsent,
        isOver18,
        hasParentalConsent: isUnder18WithAge ? formData.hasParentalConsent : false,
        hasPaid: false,
        hasCheckedIn: false,
      };

      console.log("Starting registration request...");
      console.log("API_URL target:", API_URL);

      const res = await fetch(`${API_URL}/api/attendees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log("Response status:", res.status);
      if (!res.ok) {
        const errorText = await res.text().catch(() => "N/A");
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      const resData = await res.json();
      console.log("Registration successful!", resData);

      if (wantsToDonate && resData.id) {
         window.location.href = `${STRIPE_DONATION_LINK}?client_reference_id=${resData.id}`;
         return; // Oprim procesul aici, userul e trimis pe platforma de plati
      }

      setIsSuccess(true);
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("Catch block triggered:", err);

      let errorMsg = err?.message || String(err) || "Unknown error";
      let errorTitle = "Eroare la înregistrare";
      let errorDescription = "Nu am putut procesa înregistrarea. Încearcă din nou.";

      // Dacă este eroare de la timeout (serverul de pe render era adormit)
      if (err.name === 'AbortError') {
        errorTitle = "Serverul se trezește...";
        errorDescription = "Sistemul a intrat în modul repaus. Te rugăm să mai aștepți câteva momente și să apeși din nou butonul de Înregistrare!";
      } else {
        errorDescription = `Error: ${errorMsg}\nAPI target: ${API_URL}`;
      }

      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: "",
      age: "",
      email: "",
      referralSource: "",
      dietaryRestrictions: "",
      mediaConsent: false,
      hasParentalConsent: false,
      hasAcceptedTerms: false,
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${heroConcert})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">
            Evenimentul următor
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
            Înregistrare
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Completează formularul de mai jos pentru a-ți rezerva locul. Vei primi biletul tău QR pe email.
          </p>
        </div>
      </section>

      {/* Form / Success */}
      <section className="py-16 md:py-24 section-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            {isSuccess ? (
              /* ── Success State ── */
              <Card className="border-0 shadow-xl text-center">
                <CardContent className="p-10 flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center animate-scale-in">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                      Ești înregistrat! 🎉
                    </h2>
                    <p className="text-muted-foreground">
                      Verifică-ți emailul — ți-am trimis biletul QR pe care trebuie să-l prezinți la intrare.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-3 bg-primary/10 rounded-xl border border-primary/20">
                    <Ticket className="w-5 h-5 text-primary shrink-0" />
                    <p className="text-sm text-primary font-medium">
                      Nu ai primit emailul? Verifică și folderul Spam.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Înregistrează altă persoană
                  </Button>
                </CardContent>
              </Card>
            ) : (
              /* ── Registration Form ── */
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                    Detaliile tale
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" /> Nume complet *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="Prenume Nume"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                      <Label htmlFor="age" className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" /> Vârstă *
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        min={1}
                        max={120}
                        placeholder="Ex: 20"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        className="bg-background"
                      />
                      {isUnder18WithAge && (
                        <p className="text-xs text-amber-600 font-medium">
                          ⚠️ Sub 18 ani — este necesară declarația parentală la intrare.
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" /> Email
                        <span className="text-muted-foreground text-xs font-normal">(îți trimitem biletul QR aici)</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@exemplu.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-background"
                      />
                    </div>

                    {/* Referral Source */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Map className="w-4 h-4 text-primary" /> De unde ai aflat de noi?
                      </Label>
                      <Select
                        value={formData.referralSource}
                        onValueChange={(val) => setFormData((p) => ({ ...p, referralSource: val }))}
                      >
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="Selectează o opțiune" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Prieten / Word of Mouth">Prieten / Word of Mouth</SelectItem>
                          <SelectItem value="Afiș / Flyer">Afiș / Flyer</SelectItem>
                          <SelectItem value="Altceva">Altceva</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dietary Restrictions */}
                    <div className="space-y-2">
                      <Label htmlFor="dietaryRestrictions" className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-primary" /> Restricții alimentare
                        <span className="text-muted-foreground text-xs font-normal">(opțional)</span>
                      </Label>
                      <Input
                        id="dietaryRestrictions"
                        name="dietaryRestrictions"
                        placeholder="Ex: Vegan, Fără gluten, Niciunele"
                        value={formData.dietaryRestrictions}
                        onChange={handleChange}
                        className="bg-background"
                      />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4 pt-1">
                      {/* GDPR / Terms Consent */}
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="hasAcceptedTerms"
                          checked={formData.hasAcceptedTerms}
                          onCheckedChange={(checked) =>
                            setFormData((p) => ({ ...p, hasAcceptedTerms: checked === true }))
                          }
                          className="mt-0.5"
                        />
                        <Label htmlFor="hasAcceptedTerms" className="font-normal leading-snug cursor-pointer flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>Am citit și sunt de acord cu <a onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.getElementById('terms-dialog-trigger')?.click(); }} className="text-primary underline pointer-events-auto">Regulamentul Evenimentului și Protecția Datelor (GDPR)</a> *</span>
                        </Label>
                      </div>

                      {/* Media Consent */}
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="mediaConsent"
                          checked={formData.mediaConsent}
                          onCheckedChange={(checked) =>
                            setFormData((p) => ({ ...p, mediaConsent: checked === true }))
                          }
                          className="mt-0.5"
                        />
                        <Label htmlFor="mediaConsent" className="font-normal leading-snug cursor-pointer flex items-start gap-2">
                          <Camera className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>Sunt de acord să fiu fotografiat/filmat în cadrul evenimentului (<a onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.getElementById('terms-dialog-trigger')?.click(); }} className="text-primary underline pointer-events-auto">detalii regulament</a>) *</span>
                        </Label>
                      </div>

                      {/* Parental Consent — only if under 18 */}
                      {isUnder18WithAge && (
                        <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <Checkbox
                            id="hasParentalConsent"
                            checked={formData.hasParentalConsent}
                            onCheckedChange={(checked) =>
                              setFormData((p) => ({ ...p, hasParentalConsent: checked === true }))
                            }
                            className="mt-0.5"
                          />
                          <Label htmlFor="hasParentalConsent" className="font-normal leading-snug cursor-pointer text-amber-800">
                            Un părinte/tutore legal a semnat declarația de consimțământ
                          </Label>
                        </div>
                      )}
                      
                      {/* Optional Stripe Donation */}
                      <div className="flex items-start gap-3 p-4 mt-2 bg-primary/10 rounded-lg border border-primary/20">
                        <Checkbox
                          id="wantsToDonate"
                          checked={wantsToDonate}
                          onCheckedChange={(checked) => setWantsToDonate(checked === true)}
                          className="mt-1"
                        />
                        <Label htmlFor="wantsToDonate" className="font-normal leading-snug cursor-pointer text-foreground">
                          <span className="font-bold flex items-center gap-1 mb-1">
                            <Heart className="w-4 h-4 text-primary" fill="currentColor" /> Doresc să susțin OML cu o donație online acum
                          </span>
                          <span className="text-sm text-muted-foreground block">
                            Dacă bifezi, vei fi redirecționat automat către Stripe după înregistrare. Mulțumim mult pentru susținere!
                          </span>
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-white mt-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Se înregistrează...
                        </>
                      ) : (
                        <>
                          <Ticket className="w-4 h-4 mr-2" />
                          Înregistrează-mă
                        </>
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      Prin înregistrare, ești de acord cu regulamentul evenimentului.
                      Participarea implică o donație liberă la intrare.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* GDPR Modal Dialog */}
      <Dialog>
        <DialogTrigger id="terms-dialog-trigger" className="hidden" />
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">Regulament Eveniment & Politica GDPR</DialogTitle>
            <DialogDescription>
              Informații privind prelucrarea datelor cu caracter personal de către Oradea Music Lab (OML).
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="flex-1 pr-4 mt-2">
            <div className="text-sm space-y-4 text-muted-foreground pb-4">
              <p>
                În conformitate cu GDPR - Regulamentul general privind protecția datelor personale, persoana care completează acest formular are drepturi specifice în ceea ce privește protecția datelor cu caracter personal.
              </p>
              <p>Acestea fiind:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Dreptul de a-și accesa datele personale, să le modifice, restricționeze, să își retragă acordul sau să se opună prelucrării acestora sau să solicite ștergerea acestora (dreptul de a fi uitat);</li>
                <li>Dreptul de a depune o reclamație la autoritatea de supraveghere competentă;</li>
                <li>Dreptul de a solicita Oradea Music Lab (OML) corectarea oricărei inexactități din datele personale.</li>
              </ul>
              <p>
                Aplicantul acestui formular își poate exercita oricare din drepturile menționate anterior prin transmiterea unei solicitări la adresa de e-mail: <strong className="text-foreground">oradeamusiclab@gmail.com</strong>.
              </p>
              
              <p>
                Datele personale pe care le furnizați în acest formular vor fi utilizate exclusiv în scopul administrării și organizării acestui eveniment. Aceste informații pot include numele, prenumele, adresa de e-mail, numărul de telefon etc. Datele dvs. personale vor fi stocate și procesate în condiții de securitate, conform prevederilor GDPR, și nu vor fi distribuite sau partajate cu terți fără consimțământul dvs. explicit.
              </p>
              
              <p>
                Aveți dreptul de a solicita accesul, rectificarea, ștergerea sau restricționarea prelucrării datelor dvs. personale. De asemenea, aveți dreptul de a vă retrage consimțământul în orice moment, fără a afecta legalitatea prelucrării efectuate pe baza consimțământului înainte de retragere.
              </p>
              
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mt-6 mb-4">
                <h3 className="text-foreground font-semibold text-base mb-2 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" /> Utilizarea Materialelor Foto / Video
                </h3>
                <p>
                  În cadrul acestui eveniment, se pot realiza fotografii sau înregistrări video care pot include participanții. Aceste materiale vizuale pot fi utilizate ulterior în scopuri de promovare și comunicare legate de eveniment, cum ar fi publicarea pe site-ul web, pe rețelele de socializare sau în materialele de marketing. Prin participarea la eveniment, vă exprimați consimțământul pentru utilizarea imaginilor dvs. în aceste scopuri.
                </p>
              </div>
              
              <p>
                La datele colectate prin acest formular vor avea acces doar cei implicați în organizarea înscrierilor la acest eveniment, iar acestea nu vor fi utilizate în alt scop decât cel declarat. OML va păstra datele personale atât timp cât este necesar pentru scopul declarat.
              </p>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Register;
