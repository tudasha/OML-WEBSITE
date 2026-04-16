import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Instagram, Send, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { z } from "zod";
import contactHero from "@/assets/contact-hero.jpg";

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Numele este obligatoriu" })
    .max(100, { message: "Numele trebuie să aibă maximum 100 de caractere" }),
  email: z.string()
    .trim()
    .email({ message: "Adresa de email nu este validă" })
    .max(255, { message: "Email-ul trebuie să aibă maximum 255 de caractere" }),
  message: z.string()
    .trim()
    .min(10, { message: "Mesajul trebuie să aibă cel puțin 10 caractere" })
    .max(5000, { message: "Mesajul trebuie să aibă maximum 5000 de caractere" })
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Client-side validation
    const validationResult = contactSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast({
        title: "Date invalide",
        description: firstError.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Send via mailto as a fallback (no backend contact endpoint yet)
      const subject = encodeURIComponent(`Mesaj de la ${validationResult.data.name}`);
      const body = encodeURIComponent(
        `Nume: ${validationResult.data.name}\nEmail: ${validationResult.data.email}\n\n${validationResult.data.message}`
      );
      window.open(`mailto:oradeamusiclab@gmail.com?subject=${subject}&body=${body}`, "_blank");

      toast({
        title: "Mesaj pregătit!",
        description: "Clientul tău de email s-a deschis cu mesajul pregătit. Trimite-l de acolo!",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "Eroare",
        description: "Nu am putut trimite mesajul. Te rugăm să ne contactezi direct pe email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${contactHero})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30 mb-6">
            Hai să vorbim
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            Contact
          </h1>
          <p className="text-lg text-white/70 mt-4 max-w-xl mx-auto">
            Ai întrebări? Vrei să te înscrii la Open Mic? Scrie-ne!
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 section-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Trimite-ne un mesaj
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Numele tău</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Cum te numești?"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@exemplu.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Mesajul tău</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Ce vrei să ne spui?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-background resize-none"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Se pregătește..."
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Trimite mesajul
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                  Informații de contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Suntem mereu bucuroși să auzim de la tineri pasionați de muzică! 
                  Fie că ai întrebări despre evenimentele noastre, vrei să te 
                  înscrii la Open Mic, sau pur și simplu vrei să ne cunoști - 
                  scrie-ne!
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:oradeamusiclab@gmail.com"
                  className="flex items-center gap-4 p-4 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">oradeamusiclab@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/oradeamusiclab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-background rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Instagram</p>
                    <p className="font-medium text-foreground">@oradeamusiclab</p>
                  </div>
                </a>
              </div>

              <Card className="bg-hero-bg text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-6 h-6 text-primary" />
                    <h3 className="font-display font-semibold text-lg">
                      Nu fi timid!
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Suntem o echipă de tineri și înțelegem perfect cum e să fii 
                    la început. Orice întrebare ai avea, oricât de mică ți s-ar 
                    părea - suntem aici să te ajutăm!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
