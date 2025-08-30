import { Button } from "./button";
import { AlertCircle, RefreshCw } from "lucide-react";

export const ServerErrorUI = ({ message = "Something went wrong" }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="text-center max-w-md mx-auto p-8">
        {/* Error Icon */}
        <div className="relative mb-6">
          <div className="bg-destructive/10 dark:bg-destructive/20 rounded-full h-20 w-20 flex items-center justify-center mx-auto">
            <AlertCircle className="h-10 w-10 text-destructive animate-pulse" />
          </div>
          <div className="absolute inset-0 bg-destructive/5 rounded-full animate-ping"></div>
        </div>
        
        {/* Error Content */}
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Connection Error
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {message}
          </p>
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg border border-border/30">
            Unable to connect to the cognitive load detection server. Please check your connection and try again.
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-destructive hover:bg-destructive/90 text-white font-semibold transition-all duration-200 hover:scale-105"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.history.back()}
            size="lg"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};