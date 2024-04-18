class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Start");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        let options = locationData.Choices;
        if (options) {
            for (let i = 0; i < options.length; i++) {
                let choice = options[i];
                this.engine.addChoice(choice.Text, choice);
            }
        } 
    }
    handleChoice(choice) { 
        if (choice && choice.Text === "Snooze") {
            this.engine.storyData.SnoozeCount++;
        if (this.engine.storyData.SnoozeCount==3){
            this.engine.gotoScene(Location, "Zombie eat");
            this.engine.storyData.SnoozeCount=0;
            return;
        }
        }
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}


Engine.load(Start, 'myStory.json');