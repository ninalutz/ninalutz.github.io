from json import load
from glob import glob

fout = open("README.md", "wt")
def report(text):
    print(text)
    fout.write(text + "\n")


events = []
for file in glob("*.json"):
    events.extend(load(open(file, "rt", encoding="utf8")))
report(str(len(events)) + " tracked events")
report("")

nb_people = 0
counter = {}
regions = {}
for event in events:
    href = event["context"]["location"]["href"]
    if "?" in href:
        href = href[href.index("?"):]
        if href not in counter:
            counter[href] = set()
        if "ip" in event["context"]["ip_info"] and event["context"]["ip_info"]["ip"][:3] != "18.":
            counter[href].add(event["context"]["ip_info"]["ip"])
            region = event["context"]["ip_info"]["region_name"]
            if region not in regions:
                regions[region] = set()
            regions[region].add(event["context"]["ip_info"]["ip"])
            print()
report("traffic sources:")
for k, v in counter.items():
    report(" - " + k + ": " + str(len(v)))
    nb_people += len(v)
report("")

report("regions:")
for k, v in regions.items():
    report(" - " + k + ": " + str(len(v)))
report("")

petition_ip = set()
for event in events:
    if event["data"]["event"] == "petition":
        if "ip" in event["context"]["ip_info"] and event["context"]["ip_info"]["ip"][:3] != "18.":
            petition_ip.add(event["context"]["ip_info"]["ip"])
report(str(len(petition_ip)) + " of " + str(nb_people) + " people clicked on the petition")
report("")

temperature_ip = {}
for event in events:
    if event["data"]["event"] == "temperature":
        if "ip" in event["context"]["ip_info"] and event["context"]["ip_info"]["ip"][:3] != "18.":
            if event["data"]["temperature.status"] not in temperature_ip:
                temperature_ip[event["data"]["temperature.status"]] = set()
            temperature_ip[event["data"]["temperature.status"]].add(event["context"]["ip_info"]["ip"])
report("line drawings:")
for k, v in temperature_ip.items():
    report(" - " + k + ": " + str(len(v)))
report("")

representative_ip = set()
for event in events:
    if event["data"]["event"] == "representatives":
        if "ip" in event["context"]["ip_info"] and event["context"]["ip_info"]["ip"][:3] != "18.":
            representative_ip.add(event["context"]["ip_info"]["ip"])
report(str(len(representative_ip)) + " of " + str(nb_people) + " people clicked on the find your representative")
report("")

def make_postsurvey():
    postsurvey_ip = {}
    for event in events:
        if event["data"]["event"] == "postsurvey":
            if "ip" in event["context"]["ip_info"] and event["context"]["ip_info"]["ip"][:3] != "18.":
                ip = event["context"]["ip_info"]["ip"]
                if ip not in postsurvey_ip:
                    postsurvey_ip[ip] = []
                del event["data"]["event"]
                postsurvey_ip[ip].append(event["data"])
    report(str(len(postsurvey_ip)) + " of " + str(nb_people) + " people completed the post-survey")
    report("")

    equal_or_more_concerned = {}
    how_likely_change_commute = {}
    belief_people_change_helps = {}
    stay_in_paris_agreement = {}
    for user, values in postsurvey_ip.items():
        for thing in values:
            if "postsurvey.equal_or_more" in thing:
                if thing["postsurvey.equal_or_more"] not in equal_or_more_concerned:
                    equal_or_more_concerned[thing["postsurvey.equal_or_more"]] = 0
                equal_or_more_concerned[thing["postsurvey.equal_or_more"]] += 1
            if "postsurvey.how_likely" in thing:
                if thing["postsurvey.how_likely"] not in how_likely_change_commute:
                    how_likely_change_commute[thing["postsurvey.how_likely"]] = 0
                how_likely_change_commute[thing["postsurvey.how_likely"]] += 1
            if "postsurvey.belief" in thing:
                if thing["postsurvey.belief"] not in belief_people_change_helps:
                    belief_people_change_helps[thing["postsurvey.belief"]] = 0
                belief_people_change_helps[thing["postsurvey.belief"]] += 1
            if "postsurvey.stay_paris" in thing:
                if thing["postsurvey.stay_paris"] not in stay_in_paris_agreement:
                    stay_in_paris_agreement[thing["postsurvey.stay_paris"]] = 0
                stay_in_paris_agreement[thing["postsurvey.stay_paris"]] += 1
    report("equal_or_more_concerned: " + str(equal_or_more_concerned) + "\n")
    report("how_likely_change_commute: " + str(how_likely_change_commute) + "\n")
    report("belief_people_change_helps: " + str(belief_people_change_helps) + "\n")
    report("stay_in_paris_agreement: " + str(stay_in_paris_agreement) + "\n")
make_postsurvey()

"""
TODO:
??? users completed the post-survey. ??? of these individuals (??? %) said our page made them “much more concerned” and ??? (??? %) said that 
our page made them “slightly more concerned.” Moreover, ??? (??? %) said that they are “very likely” to change the way they commute after going 
through our web page, compared to ??? (??? %) who said that they are “slightly likely” and ??? (???%) who said they are “not at all likely.” 
Finally, ??? of those who filled out the post-survey (??? %) said they believe that many people greening their commutes would “make a big 
difference,” compared to ??? (??? %) who said it would “make some difference” and ??? (???%) who said it “wouldn’t change anything.” 
"""