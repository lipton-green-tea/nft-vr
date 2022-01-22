def filter_transcript(transcript):
    sentence = transcript.split()


    rising_prices = ['increase', 'rise', 'higher', 'high', 'expensive']
    prices = ['costs', 'prices', 'value']
    cheaper_prices = ['lower', 'reduce', 'drop', 'cheaper', 'cheapest', 'low']
    current_trends = ['latest', 'current', 'trends', 'newest', 'new']

    Increase_mentioned = check_in_array(sentence, rising_prices)
    Price_mentioned = check_in_array(sentence, prices)
    Low_mentioned = check_in_array(sentence, cheaper_prices)
    current_mentioned = check_in_array(sentence, current_trends)

    action = result(rising_prices, prices, cheaper_prices, current_trends)
    return action



#all time day week month and year



rising_prices = ['increase', 'rise', 'higher', 'high', 'expensive']
prices = ['costs', 'prices', 'value']
cheaper_prices = ['lower', 'reduce', 'drop', 'cheaper', 'cheapest', 'low']
current_trends = ['latest', 'current', 'trends', 'newest', 'new']


def check_in_array(A, B):
    for i in range(len(A)):
        if A[i] in B:
            return True
    
def result(rising_prices, prices, cheaper_prices, current_trends):
    if rising_prices and prices:
        result = 'Show Higher Prices'
    elif prices and cheaper_prices:
        result = 'Show lower Prices'
    elif current_trends:
        result = 'Show current trends'
    return result

transcript_ = 'can you show me higher prices of NFTs'
final_act = filter_transcript(transcript_)
print(final_act)
