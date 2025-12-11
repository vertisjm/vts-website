import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function HeroSection() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">Contact Us</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-contact-title">
            Let's Start a <span className="text-primary">Conversation</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed" data-testid="text-contact-description">
            Whether you need IT support, want to discuss a project, or simply have questions, we're here to help. Reach out and let's explore how we can support your business.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const captchaRef = useRef<HTMLImageElement>(null);

  const reloadCaptcha = () => {
    if (captchaRef.current) {
      const src = captchaRef.current.src;
      if (src.indexOf('&d') !== -1) {
        captchaRef.current.src = src.substring(0, src.indexOf('&d')) + '&d' + new Date().getTime();
      } else {
        captchaRef.current.src = src + '&d' + new Date().getTime();
      }
    }
  };

  useEffect(() => {
    const validateEmail = () => {
      const form = document.forms.namedItem('WebToLeads1691948000001924023');
      if (!form) return true;
      const emailFld = form.querySelectorAll('[data-ftype="email"]');
      for (let i = 0; i < emailFld.length; i++) {
        const emailInput = emailFld[i] as HTMLInputElement;
        const emailVal = emailInput.value;
        if (emailVal.replace(/^\s+|\s+$/g, '').length !== 0) {
          const atpos = emailVal.indexOf('@');
          const dotpos = emailVal.lastIndexOf('.');
          if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailVal.length) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return false;
          }
        }
      }
      return true;
    };

    const historyBack = () => {
      const submitBtn = document.querySelector('.formsubmit') as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.removeAttribute('disabled');
      }
      reloadCaptcha();
      window.removeEventListener('focus', historyBack);
    };

    const trackVisitor = () => {
      try {
        const $zoho = (window as any).$zoho;
        if ($zoho) {
          const form = document.forms.namedItem('WebToLeads1691948000001924023');
          if (form) {
            const LDTuvidObj = form.elements.namedItem('LDTuvid') as HTMLInputElement;
            if (LDTuvidObj && $zoho.salesiq?.visitor?.uniqueid) {
              LDTuvidObj.value = $zoho.salesiq.visitor.uniqueid();
            }
            let name = '';
            const lastnameObj = form.elements.namedItem('Last Name') as HTMLInputElement;
            if (lastnameObj) {
              name = lastnameObj.value;
            }
            const firstnameObj = form.elements.namedItem('First Name') as HTMLInputElement;
            if (firstnameObj) {
              name = firstnameObj.value + ' ' + name;
            }
            if ($zoho.salesiq?.visitor?.name) {
              $zoho.salesiq.visitor.name(name);
            }
            const emailObj = form.elements.namedItem('Email') as HTMLInputElement;
            if (emailObj && $zoho.salesiq?.visitor?.email) {
              $zoho.salesiq.visitor.email(emailObj.value);
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    const checkMandatory = (e: Event) => {
      const mndFields = ['Company', 'Last Name'];
      const fldLangVal = ['Company', 'Last Name'];
      const form = document.forms.namedItem('WebToLeads1691948000001924023');
      if (!form) return true;
      
      for (let i = 0; i < mndFields.length; i++) {
        const fieldObj = form.elements.namedItem(mndFields[i]) as HTMLInputElement;
        if (fieldObj) {
          if (fieldObj.value.replace(/^\s+|\s+$/g, '').length === 0) {
            alert(fldLangVal[i] + ' cannot be empty.');
            fieldObj.focus();
            e.preventDefault();
            return false;
          }
        }
      }
      
      if (!validateEmail()) {
        e.preventDefault();
        return false;
      }

      trackVisitor();
      
      const urlparams = new URLSearchParams(window.location.search);
      if (urlparams.has('service') && urlparams.get('service') === 'smarturl') {
        const webform = document.getElementById('webform1691948000001924023');
        if (webform) {
          const service = urlparams.get('service');
          const smarturlfield = document.createElement('input');
          smarturlfield.setAttribute('type', 'hidden');
          smarturlfield.setAttribute('value', service || '');
          smarturlfield.setAttribute('name', 'service');
          webform.appendChild(smarturlfield);
        }
      }

      const submitBtn = document.querySelector('.formsubmit') as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.setAttribute('disabled', 'true');
      }
      window.addEventListener('focus', historyBack);
      
      return true;
    };

    const form = document.getElementById('webform1691948000001924023');
    if (form) {
      form.addEventListener('submit', checkMandatory);
    }

    const analyticsScript = document.createElement('script');
    analyticsScript.id = 'wf_anal';
    analyticsScript.src = 'https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=00d7200e236286e6bf4bf319324c777a5651834a1730782029ea15ba0c448877cb0bde7b7afb43910de2a061a03596c4gid6efff3c1f72a92ae490ce9bf9033dee56bce68b01780d52a87e2f3ac599fa5c7gid1fd65a926e2b0d23bed87a9eacc7ed60da9ca28481b5118b5be5c6f1421be750gid7bab6b40286f77c4d67eb89186280deb462cb760ac0490aa7ce6dd4b9c88a41c&tw=e19c0ee2214d67761a6cc67fc86cf4024711218961bc001586beee7c3a40123f';
    document.body.appendChild(analyticsScript);

    return () => {
      if (form) {
        form.removeEventListener('submit', checkMandatory);
      }
      if (analyticsScript.parentNode) {
        analyticsScript.parentNode.removeChild(analyticsScript);
      }
    };
  }, []);

  return (
    <Card data-testid="card-contact-form">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
        <form 
          id="webform1691948000001924023"
          action="https://crm.zoho.com/crm/WebToLeadForm"
          name="WebToLeads1691948000001924023"
          method="POST"
          acceptCharset="UTF-8"
          className="space-y-6"
          target="captchaFrame"
        >
          <input type="hidden" name="xnQsjsdp" value="1b11fb5514f6e562e403a607dfa376141150d413f6a0fa64b85f2c213315f8b6" />
          <input type="hidden" name="zc_gad" id="zc_gad" value="" />
          <input type="hidden" name="xmIwtLD" value="ea7be16663905b5528be18a3468f4ba95dfaff8794a77c938ee59abf5bf0ca2de25c4e31b84a0fb127dbf60feb7cfd67" />
          <input type="hidden" name="actionType" value="TGVhZHM=" />
          <input type="hidden" name="returnURL" value="null" />
          <input type="hidden" id="ldeskuid" name="ldeskuid" />
          <input type="hidden" id="LDTuvid" name="LDTuvid" />
          <input type="hidden" name="Lead Source" value="OnlineStore" />
          <input type="hidden" name="aG9uZXlwb3Q" value="" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="Company">
                Company <span className="text-destructive">*</span>
              </Label>
              <Input 
                type="text" 
                id="Company" 
                name="Company" 
                maxLength={200}
                required
                data-testid="input-company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="First_Name">First Name</Label>
              <Input 
                type="text" 
                id="First_Name" 
                name="First Name" 
                maxLength={40}
                data-testid="input-first-name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="Last_Name">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input 
                type="text" 
                id="Last_Name" 
                name="Last Name" 
                maxLength={80}
                required
                data-testid="input-last-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Email">Email</Label>
              <Input 
                type="email" 
                id="Email" 
                name="Email" 
                maxLength={100}
                data-ftype="email"
                data-testid="input-email"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="Phone">Phone</Label>
            <Input 
              type="tel" 
              id="Phone" 
              name="Phone" 
              maxLength={30}
              data-testid="input-phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="Description">Message</Label>
            <Textarea 
              id="Description" 
              name="Description"
              className="min-h-[150px] resize-none"
              placeholder="Tell us about your project or inquiry..."
              data-testid="textarea-message"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="captchaField1691948000001924023">Enter the Captcha</Label>
              <Input 
                type="text" 
                id="captchaField1691948000001924023" 
                name="enterdigest"
                maxLength={10}
                data-testid="input-captcha"
              />
            </div>
            <div className="flex items-center gap-4">
              <img 
                ref={captchaRef}
                id="imgid1691948000001924023"
                src="https://crm.zoho.com/crm/CaptchaServlet?formId=ea7be16663905b5528be18a3468f4ba95dfaff8794a77c938ee59abf5bf0ca2de25c4e31b84a0fb127dbf60feb7cfd67&grpid=1b11fb5514f6e562e403a607dfa376141150d413f6a0fa64b85f2c213315f8b6"
                alt="Captcha"
                className="border rounded"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={reloadCaptcha}
                className="gap-2"
                data-testid="button-reload-captcha"
              >
                <RefreshCw className="h-4 w-4" />
                Reload
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              type="submit" 
              size="lg"
              className="formsubmit flex-1"
              data-testid="button-submit"
            >
              Submit
            </Button>
            <Button 
              type="reset" 
              variant="outline"
              size="lg"
              data-testid="button-reset"
            >
              Reset
            </Button>
          </div>
        </form>
        <iframe name="captchaFrame" style={{ display: 'none' }} title="Captcha Frame" />
      </CardContent>
    </Card>
  );
}

function ContactInfoSection() {
  return (
    <div className="space-y-6">
      <Card data-testid="card-contact-info">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Office Address</p>
                <p className="text-sm text-muted-foreground">
                  1b Braemar Avenue<br />
                  Kingston 10, Jamaica
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Phone</p>
                <a href="tel:+18766348700" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone">
                  +1 (876) 634-8700
                </a>
                <br />
                <a href="tel:+18766348699" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone-alt">
                  +1 (876) 634-8699
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Email</p>
                <a href="mailto:sales@vertisjm.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-email">
                  sales@vertisjm.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Office Hours</p>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Weekend: Emergency Support Only
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card data-testid="card-map">
        <CardContent className="p-0 overflow-hidden">
          <div className="aspect-[4/3] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1897.2!2d-76.7877!3d18.0085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3f8d9c8a2f1b%3A0x0!2sBraemar%20Avenue%2C%20Kingston%2010%2C%20Jamaica!5e0!3m2!1sen!2s!4v1702234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vertis Technology Office Location"
              className="rounded-b-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <HeroSection />
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ContactFormSection />
            </div>
            <div className="lg:col-span-2">
              <ContactInfoSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
