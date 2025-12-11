import { useEffect } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  useEffect(() => {
    const validateEmail = () => {
      const form = document.forms.namedItem('WebToLeads1691948000001924023');
      if (!form) return true;
      const emailFld = form.querySelectorAll('[ftype=email]');
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

    const checkMandatory = (e: Event) => {
      const mndFields = ['Company', 'Last Name'];
      const fldLangVal = ['Company', 'Last Name'];
      const form = document.forms.namedItem('WebToLeads1691948000001924023');
      if (!form) return true;

      for (let i = 0; i < mndFields.length; i++) {
        const fieldObj = form.elements.namedItem(mndFields[i]) as HTMLInputElement;
        if (fieldObj) {
          if (fieldObj.value.replace(/^\s+|\s+$/g, '').length === 0) {
            if (fieldObj.type === 'file') {
              alert('Please select a file to upload.');
              fieldObj.focus();
              e.preventDefault();
              return false;
            }
            alert(fldLangVal[i] + ' cannot be empty.');
            fieldObj.focus();
            e.preventDefault();
            return false;
          } else if (fieldObj.nodeName === 'SELECT') {
            if ((fieldObj as unknown as HTMLSelectElement).options[(fieldObj as unknown as HTMLSelectElement).selectedIndex].value === '-None-') {
              alert(fldLangVal[i] + ' cannot be none.');
              fieldObj.focus();
              e.preventDefault();
              return false;
            }
          } else if (fieldObj.type === 'checkbox') {
            if (!fieldObj.checked) {
              alert('Please accept ' + fldLangVal[i]);
              fieldObj.focus();
              e.preventDefault();
              return false;
            }
          }
        }
      }

      if (!validateEmail()) {
        e.preventDefault();
        return false;
      }

      try {
        const $zoho = (window as any).$zoho;
        if ($zoho && $zoho.salesiq) {
          const LDTuvidObj = form.elements.namedItem('LDTuvid') as HTMLInputElement;
          if (LDTuvidObj && $zoho.salesiq.visitor?.uniqueid) {
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
          if ($zoho.salesiq.visitor?.name) {
            $zoho.salesiq.visitor.name(name);
          }
          const emailObj = form.elements.namedItem('Email') as HTMLInputElement;
          if (emailObj && $zoho.salesiq.visitor?.email) {
            $zoho.salesiq.visitor.email(emailObj.value);
          }
        }
      } catch (err) {
        console.error(err);
      }

      return true;
    };

    const form = document.getElementById('webform1691948000001924023');
    if (form) {
      form.addEventListener('submit', checkMandatory);
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', checkMandatory);
      }
    };
  }, []);

  return (
    <Card id="contact-form" data-testid="card-contact-form">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
        
        <style dangerouslySetInnerHTML={{ __html: `
          #crmWebToEntityForm.zcwf_lblLeft {
            width: 100%;
            box-sizing: border-box;
          }
          #crmWebToEntityForm.zcwf_lblLeft * {
            box-sizing: border-box;
          }
          #crmWebToEntityForm {
            text-align: left;
          }
          #crmWebToEntityForm * {
            direction: ltr;
          }
          .zcwf_lblLeft .zcwf_title {
            word-wrap: break-word;
            padding: 0px 6px 10px;
            font-weight: bold;
          }
          .zcwf_lblLeft .zcwf_col_fld input[type=text],
          .zcwf_lblLeft .zcwf_col_fld input[type=password],
          .zcwf_lblLeft .zcwf_col_fld textarea {
            width: 100%;
            border: 1px solid hsl(var(--border)) !important;
            resize: vertical;
            border-radius: 6px;
            padding: 8px 12px;
            font-size: 14px;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
          }
          .zcwf_lblLeft .zcwf_col_fld input:focus,
          .zcwf_lblLeft .zcwf_col_fld textarea:focus {
            outline: none;
            border-color: hsl(var(--primary)) !important;
            box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2);
          }
          .zcwf_lblLeft .zcwf_col_lab {
            word-break: break-word;
            padding: 0px 0px 6px;
            font-size: 14px;
            font-weight: 500;
            color: hsl(var(--foreground));
          }
          .zcwf_lblLeft .zcwf_col_fld {
            width: 100%;
            padding: 0px;
            position: relative;
            margin-bottom: 16px;
          }
          .zcwf_lblLeft .wfrm_fld_dpNn {
            display: none;
          }
          .zcwf_lblLeft .zcwf_col_fld_slt {
            width: 100%;
            border: 1px solid hsl(var(--border));
            background: hsl(var(--background));
            border-radius: 6px;
            font-size: 14px;
            padding: 8px 12px;
            color: hsl(var(--foreground));
          }
          .zcwf_lblLeft .zcwf_row {
            margin: 0 0 16px 0;
          }
          .zcwf_lblLeft .zcwf_col_help {
            display: none;
          }
          .zcwf_lblLeft .formsubmit {
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            padding: 10px 24px;
            border-radius: 6px;
            transition: all 0.2s;
          }
          .zcwf_lblLeft .formsubmit.zcwf_button {
            color: white !important;
            background: hsl(var(--primary));
            border: none;
          }
          .zcwf_lblLeft .formsubmit.zcwf_button:hover {
            opacity: 0.9;
          }
          .zcwf_lblLeft .zcwf_button {
            font-size: 14px;
            color: hsl(var(--foreground));
            border: 1px solid hsl(var(--border));
            padding: 10px 24px;
            border-radius: 6px;
            cursor: pointer;
            background: transparent;
            margin-left: 8px;
          }
          .zcwf_lblLeft .zcwf_button:hover {
            background: hsl(var(--muted));
          }
          .zcwf_row-buttons {
            display: flex;
            gap: 8px;
            margin-top: 8px;
          }
        `}} />

        <div id="crmWebToEntityForm" className="zcwf_lblLeft crmWebToEntityForm">
          <form 
            id="webform1691948000001924023" 
            action="https://crm.zoho.com/crm/WebToLeadForm" 
            name="WebToLeads1691948000001924023" 
            method="POST" 
            acceptCharset="UTF-8"
          >
            <input type="text" style={{ display: 'none' }} name="xnQsjsdp" defaultValue="cc9cef7215845fdc5085f4f913be79c0ddc756b44a0f3f50a75c0b998844413b" />
            <input type="hidden" name="zc_gad" id="zc_gad" defaultValue="" />
            <input type="text" style={{ display: 'none' }} name="xmIwtLD" defaultValue="76cf845645cc0079849ff9635a862120e90a99538df18a3951b1a984b2f9afbff6e34abf9e201c187dcde73847a3f090" />
            <input type="text" style={{ display: 'none' }} name="actionType" defaultValue="TGVhZHM=" />
            <input type="text" style={{ display: 'none' }} name="returnURL" defaultValue="https://vertisjm.com" />
            <input type="text" style={{ display: 'none' }} id="ldeskuid" name="ldeskuid" />
            <input type="text" style={{ display: 'none' }} id="LDTuvid" name="LDTuvid" />

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Company">Company <span style={{ color: 'hsl(var(--destructive))' }}>*</span></label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="Company" aria-required="true" aria-label="Company" name="Company" maxLength={200} data-testid="input-company" />
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="First_Name">First Name</label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="First_Name" aria-required="false" aria-label="First Name" name="First Name" maxLength={40} data-testid="input-first-name" />
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Last_Name">Last Name <span style={{ color: 'hsl(var(--destructive))' }}>*</span></label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="Last_Name" aria-required="true" aria-label="Last Name" name="Last Name" maxLength={80} data-testid="input-last-name" />
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Email">Email</label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="Email" aria-required="false" aria-label="Email" name="Email" maxLength={100} data-testid="input-email" />
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Phone">Phone</label>
              </div>
              <div className="zcwf_col_fld">
                <input type="text" id="Phone" aria-required="false" aria-label="Phone" name="Phone" maxLength={30} data-testid="input-phone" />
              </div>
            </div>

            <div className="zcwf_row wfrm_fld_dpNn">
              <div className="zcwf_col_lab">
                <label htmlFor="Lead_Source">Lead Source</label>
              </div>
              <div className="zcwf_col_fld">
                <select className="zcwf_col_fld_slt" id="Lead_Source" aria-required="false" aria-label="Lead Source" name="Lead Source" defaultValue="OnlineStore">
                  <option value="-None-">-None-</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Employee Referral">Employee Referral</option>
                  <option value="External Referral">External Referral</option>
                  <option value="OnlineStore">OnlineStore</option>
                  <option value="Partner">Partner</option>
                  <option value="Public Relations">Public Relations</option>
                  <option value="Sales Mail Alias">Sales Mail Alias</option>
                  <option value="Seminar Partner">Seminar Partner</option>
                  <option value="Seminar-Internal">Seminar-Internal</option>
                  <option value="Trade Show">Trade Show</option>
                  <option value="Web Download">Web Download</option>
                  <option value="Web Research">Web Research</option>
                  <option value="Chat">Chat</option>
                </select>
              </div>
            </div>

            <div className="zcwf_row">
              <div className="zcwf_col_lab">
                <label htmlFor="Description">Message</label>
              </div>
              <div className="zcwf_col_fld">
                <textarea id="Description" aria-required="false" aria-label="Description" name="Description" rows={4} data-testid="textarea-message" />
              </div>
            </div>

            <input type="hidden" name="aG9uZXlwb3Q" defaultValue="" />

            <div className="zcwf_row zcwf_row-buttons">
              <input type="submit" id="formsubmit" className="formsubmit zcwf_button" value="Submit" aria-label="Submit" title="Submit" data-testid="button-submit" />
              <input type="reset" className="zcwf_button" name="reset" value="Reset" aria-label="Reset" title="Reset" data-testid="button-reset" />
            </div>
          </form>
        </div>
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
  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        const form = document.getElementById('contact-form');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

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
