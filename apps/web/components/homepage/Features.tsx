import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Users } from "lucide-react";

export default function Features() {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="w-10 h-10 mx-auto text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Easy Task Tracking</h3>
            <p className="text-gray-600">
              Stay on top of your tasks with a clean and intuitive interface.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 text-center">
            <Users className="w-10 h-10 mx-auto text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600">
              Share tasks, assign responsibilities, and achieve goals together.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 text-center">
            <Clock className="w-10 h-10 mx-auto text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Deadline Reminders</h3>
            <p className="text-gray-600">
              Never miss an important deadline with timely notifications.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
