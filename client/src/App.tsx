import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import ServiceDetail from "@/pages/service-detail";
import Partners from "@/pages/partners";
import Contact from "@/pages/contact";
import Support from "@/pages/support";
import Careers from "@/pages/careers";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services/:id" component={ServiceDetail} />
        <Route path="/partners" component={Partners} />
        <Route path="/contact" component={Contact} />
        <Route path="/support" component={Support} />
        <Route path="/careers" component={Careers} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
