from aws_cdk.core import Stack, Construct
import aws_cdk.aws_dynamodb as dynamodb


class ProductionStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        table = dynamodb.Table(self, 'Users',
            partition_key={"name": 'email', "type": dynamodb.AttributeType.STRING},
            sort_key={"name": 'last_name', "type": dynamodb.AttributeType.STRING},
            billing_mode= dynamodb.BillingMode.PAY_PER_REQUEST
            )