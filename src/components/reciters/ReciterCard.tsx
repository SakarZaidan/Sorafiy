import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Reciter } from "@/Iib/types";

interface ReciterCardProps {
  reciter: Reciter;
  viewMode: 'grid' | 'list';
}

const ReciterCard: React.FC<ReciterCardProps> = ({ reciter, viewMode }) => {
  return (
    <Card className={viewMode === 'list' ? 'flex items-center p-4 w-full' : ''}>
 {viewMode === 'list' && reciter.avatar && (
        <div className="flex-shrink-0 mr-4">
 <img
            src={reciter.avatar}
            alt={`${reciter.name}'s avatar`}
 className="w-16 h-16 rounded-full object-cover"
 />
 </div>
      )}
      <div className={viewMode === 'list' ? 'flex flex-col justify-center flex-grow' : ''}>
        <CardHeader className={viewMode === 'list' ? 'p-0' : ''}>
        <CardTitle>{reciter.name}</CardTitle>
        <CardDescription>{reciter.arabicName}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Style: {reciter.style}</p>
        {reciter.info && <p className="text-sm text-muted-foreground mt-2">{reciter.info}</p>}
      </CardContent>
      </div>
    </Card>
  );
};

export default ReciterCard;